import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/test', async (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})