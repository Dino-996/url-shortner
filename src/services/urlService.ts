import { UrlModel } from "../models/urlModel";

export const createShortUrl = async (shortId: string, originalUrl: string) => {
    return UrlModel.create({ shortId, originalUrl });
};

export const getOriginalUrl = async (shortId: string) => {
    return UrlModel.findOneAndUpdate({ shortId }, { $inc: { visitCount: 1 } });
};

export const getStatus = async (shortId: string) => {
    return UrlModel.findOne({ shortId });
};

export const getLength = async () => {
    return UrlModel.countDocuments();
}

export const getAllShortUrl = async () => {
    return UrlModel.find().select('-_id shortId originalUrl visitCount createdAt').sort({ createdAt: -1 });
}

export const deleteShortUrl = async (shortId: string) => {
    return UrlModel.deleteOne({ shortId });
}