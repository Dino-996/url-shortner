import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: { type: String, require: true, unique: true },
    originalUrl: { type: String, require: true },
    visitCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, 
{
    timestamps: true
}
);

export const UrlModel = mongoose.model("Url", urlSchema);