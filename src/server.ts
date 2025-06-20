import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const port = process.env.PORT || 5000;

const bootstrap = async () => {
console.log('📡 Bootstrapping server...');
await connectDB();
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
};

bootstrap();
