import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IIssuedVoucher extends Document {
  voucher: Types.ObjectId;
  user: Types.ObjectId;
  issuedAt: Date;
  redeemed: boolean;
  redeemedAt?: Date;
}

const IssuedVoucherSchema: Schema = new Schema<IIssuedVoucher>(
  {
    voucher: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
    redeemedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIssuedVoucher>('IssuedVoucher', IssuedVoucherSchema);
