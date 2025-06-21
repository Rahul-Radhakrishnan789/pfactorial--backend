import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import morgan from 'morgan';


dotenv.config();
connectDB();
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);


httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
