import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnection.js';
import authRouter from './routes/authRoute.js';
import productRouter from './routes/productRoutes.js';
import permissionRoute from './routes/permissionRoutes.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

dbConnect();

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/users', userRoute)
app.use('/api/products', productRouter)
app.use('/api/permissions', permissionRoute);

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
});
