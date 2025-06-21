import { Request, Response, NextFunction } from 'express';
import Voucher from '../models/Voucher.js';
import issuedVoucher from '../models/issuedVoucher.js';
import { CustomError } from '../utils/customError.js';
import sendResponse from '../utils/sendResponse.js';
import { generateRandomCode } from '../utils/generateCode.js';

export const createVoucher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, expiryDate, currency, code, autoGenerate } = req.body;

    if (!name || !expiryDate || !currency) {
      return next(new CustomError('Name, Expiry Date, and Currency are required', 400));
    }

    const voucherCode = autoGenerate ? generateRandomCode() : code;
    if (!voucherCode) {
      return next(new CustomError('Voucher code is required if auto-generate is off', 400));
    }

    const existingCode = await Voucher.findOne({ code: voucherCode });
    if (existingCode) {
      return next(new CustomError('Voucher code already exists', 409));
    }

    const voucher = await Voucher.create({
      name,
      description,
      expiryDate,
      currency,
      code: voucherCode
    });

    if (!voucher) {
      return next(new CustomError('Failed to create voucher', 500));
    }

    sendResponse(res, 201, { success: true, data: voucher });
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};

export const getVouchers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, sortBy = 'name', order = 'asc' } = req.query;
    const limit = 5;
    const skip = (Number(page) - 1) * limit;

    const vouchers = await Voucher.find()
      .sort({ [String(sortBy)]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    sendResponse(res, 200, { success: true, data: vouchers });
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};


export const updateVoucher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, expiryDate, currency } = req.body;

    if (!name && !description && !expiryDate && !currency) {
      return next(new CustomError('At least one field is required to update the voucher', 400));
    }

    const updatedVoucher = await Voucher.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(expiryDate && { expiryDate }),
        ...(currency && { currency }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedVoucher) {
      return next(new CustomError('Voucher not found', 404));
    }
    sendResponse(res, 200, { success: true, data: updatedVoucher });
  
  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};

export const deleteVoucher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findById(id);

    if (!voucher) return next(new CustomError('Voucher not found', 404));


    const issued = await issuedVoucher.findOne({ voucher: id });
    if (issued) {
      return next(new CustomError('Cannot delete: Voucher is already issued', 400));
    }

    await Voucher.findByIdAndDelete(id);

    sendResponse(res, 200, { success: true, message: 'Voucher deleted successfully' });

  } catch (err: any) {
    next(new CustomError(err.message, 500));
  }
};
