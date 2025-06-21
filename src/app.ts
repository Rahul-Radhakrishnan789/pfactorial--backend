import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import middleError from './middleware/error.middleware.js';
import authRoutes from "./routes/auth.routes.js";
import voucherRoutes from "./routes/voucher.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      workerSrc: ["'self'", "blob:"],
      objectSrc: [],
      imgSrc: ["'self'", "blob:", "data:"],
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/voucher', voucherRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use(middleError)


export default app;
