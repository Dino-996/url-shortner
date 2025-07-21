import { Request, Response, NextFunction } from "express";
import { generateShortId } from "../util/generateShortId";
import { isValidUrl } from "../util/validateUrl";
import { createShortUrl, getAllShortUrl, getLength, getOriginalUrl, getStatus } from "../services/urlService";

export const shorten = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { originalUrl } = req.body;
        if (!isValidUrl(originalUrl)) {
            return res.status(400).json({ error: 'URL non valido' });
        }
        const shortId = generateShortId();
        await createShortUrl(shortId, originalUrl);
        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
    } catch (error) {
        next(error);
    }
};

export const redirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortId } = req.params;
        const doc = await getOriginalUrl(shortId);
        if (!doc) {
            return res.status(404).json({ error: 'URL non trovato' });
        }
        return res.redirect(doc.originalUrl!);
    } catch (error) {
        next(error)
    };
};

export const stats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await getStatus(req.params.shortId);
        if (!doc) {
            return res.status(404).json({ error: "ID non trovato" });
        }
        res.json({ originaUrl: doc.originalUrl, visitCount: doc.visitCount })
    } catch (error) {
        next(error);
    }
}

export const length = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const length = await getLength();
        res.status(200).json({ total: length });
    } catch (error) {
        next(error);
    }
};

export const allUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await getAllShortUrl();
        res.status(200).json(doc);
    } catch (error) {
        next(error);
    }
};