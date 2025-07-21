import app from "./server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('MongoDB connesso');
    app.listen(PORT, () => {
        console.log(`Server attivo su http://localhost:${PORT}`);
    });
}).catch((error) => console.error("MongoDB connection error:", error));
