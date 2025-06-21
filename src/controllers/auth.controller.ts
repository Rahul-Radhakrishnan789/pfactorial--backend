import { Request, Response, NextFunction } from "express";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { CustomError } from "../utils/customError.js";
import sendResponse from "../utils/sendResponse.js";
import JwtService from "../utils/jwtService.js";
import { comparePassword } from "../utils/hashPassword.js";
import { AuthRequest } from "../middleware/auth.middleware.js";



export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }) as InstanceType<typeof Admin> | null;
    if (!admin) return next(new CustomError("Admin not found", 404));

    const isMatch = await comparePassword(password, admin.password);

    console.log(password, admin.password)
    if (!isMatch) return next(new CustomError("Invalid credentials", 400));

    const token = await JwtService.sign((admin?._id as any).toString());

    sendResponse(res, 200, {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};


export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.find({ _id: { $ne: req.user } });
    sendResponse(res, 200, user);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new CustomError("User not found", 404));
    sendResponse(res, 200, user);
  } catch (error: any) {
    return next(new CustomError(error.message, 500));
  }
};
