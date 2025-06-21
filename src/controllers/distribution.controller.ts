import { Request, Response, NextFunction } from 'express';
import Voucher from '../models/Voucher.js';
import issuedVoucher from '../models/issuedVoucher.js';
import { CustomError } from '../utils/customError.js';
import { Types } from 'mongoose';
import sendResponse from '../utils/sendResponse.js';

export const issueVouchers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { voucherId, userIds } = req.body; // userIds: string[]
    if (!voucherId || !Array.isArray(userIds) || !userIds.length) {
      return next(new CustomError('voucherId and userIds are required', 400));
    }

    const voucher = await Voucher.findById(voucherId);
    if (!voucher) return next(new CustomError('Voucher not found', 404));
    if (new Date(voucher.expiryDate) < new Date()) {
      return next(new CustomError('Cannot issue expired voucher', 400));
    }

    const issuedDocs = [];
    for (const uid of userIds) {
      const exists = await issuedVoucher.findOne({ voucher: voucherId, user: uid });
      if (exists) continue; // skip duplicates
      issuedDocs.push({ voucher: new Types.ObjectId(voucherId), user: new Types.ObjectId(uid) });
    }
    if (!issuedDocs.length) {
      return next(new CustomError('No new users to issue', 400));
    }

    const result = await issuedVoucher.insertMany(issuedDocs);
    sendResponse(res, 201, {
      success: true,
        issuedCount: result.length,
        message: `${result.length} vouchers issued successfully`
    });
   
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};

// Track issued vouchers with filters
export const getIssuedVouchers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = '1', status, search, startDate, endDate } = req.query;
    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const filter: any = {};
    if (status) filter.redeemed = status === 'used';
    if (status === 'expired') filter['voucher.expiryDate'] = { $lt: new Date() };
    if (startDate || endDate) {
      filter.issuedAt = {};
      if (startDate) filter.issuedAt.$gte = new Date(String(startDate));
      if (endDate) filter.issuedAt.$lte = new Date(String(endDate));
    }
    if (search) {
      const regex = new RegExp(String(search), 'i');
      filter.$or = [
        { 'voucher.name': regex },
        { 'voucher.code': regex },
        { 'user.email': regex }
      ];
    }

    const data = await issuedVoucher.find(filter)
      .populate('voucher', 'name code expiryDate')
      .populate('user', 'email name')
      .sort({ issuedAt: -1 })
      .skip(skip)
      .limit(limit);
      
 sendResponse(res, 200, {
      success: true,
        data,
        total: await issuedVoucher.countDocuments(filter),
        page: Number(page), 
        limit
    });
 
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};