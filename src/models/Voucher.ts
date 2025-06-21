import mongoose, { Document, Schema } from 'mongoose';

export interface IVoucher extends Document {
  name: string;
  description?: string;
  code: string;
  currency: 'USD' | 'EUR' | 'GBP';
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VoucherSchema: Schema = new Schema<IVoucher>(
  {
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      required: true,
    },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVoucher>('Voucher', VoucherSchema);
