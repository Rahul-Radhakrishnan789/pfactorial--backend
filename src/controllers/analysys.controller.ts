import { Request, Response, NextFunction } from 'express';
import Voucher from '../models/Voucher.js';
import issuedVoucher from '../models/issuedVoucher.js';
import { CustomError } from '../utils/customError.js';
import sendResponse from '../utils/sendResponse.js';

export const getDashboardMetrics = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const totalCreated = await Voucher.countDocuments();
    const now = new Date();
    const active = await Voucher.countDocuments({ expiryDate: { $gte: now } });
    const expired = totalCreated - active;

    const totalIssued = await issuedVoucher.countDocuments();
    const percentIssued = totalCreated ? (totalIssued / totalCreated) * 100 : 0;

    const currencyBreakdown = await Voucher.aggregate([
      { $group: { _id: '$currency', count: { $sum: 1 } } }
    ]);

    const recentActions = await issuedVoucher.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate('voucher', 'name')
      .populate('user', 'email');


      sendResponse(res, 200, {
      success: true,
        metrics: {
            totalCreated,
            active,
            expired,
            totalIssued,
            percentIssued,
            currencyBreakdown: currencyBreakdown.reduce((acc: any, curr: any) => {
            acc[curr._id] = curr.count;
            return acc;
            }, {}),
            recentActions
        }
    });
  
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};