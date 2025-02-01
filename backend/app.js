import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRoutes from "./Routes/AuthRouter.js";

dotenv.config();
const URL = process.env.URL;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.json({ message: "Hello from server" });
});

mongoose.set("strictQuery", false);
mongoose.connect(URL).then(() => app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})).catch((error) => console.log(error.message));
