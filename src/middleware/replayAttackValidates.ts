import { NextFunction, Request, Response } from 'express';
import { verifyBlingSignature } from "../utils/compareHash";
import { WebhookService } from '../services/webhookService';

export const protectReplay = async (req:Request, res:Response, next:NextFunction) => {
    const body = req.body;
    
    
    const signature = req.header("X-Bling-Signature-256") as string | undefined;             
    const isValid = verifyBlingSignature(req.body, signature, process.env.BLING_CLIENT_SECRET!);

    if (!isValid) {
        return res.status(401).send("Assinatura inválida");
        }
    // procure algum ID único no payload
    const uniqueId = body.id || body.eventId 

    if (!uniqueId) {
        return res.status(400).json({ error: "Nenhum ID único encontrado para proteção de replay." });
    }

    // se já existe no Redis → é replay
    const exists = await WebhookService.validateEventoId(`webhook:${uniqueId}`);
    if (exists) {
        return res.status(409).json({ error: "Requisição duplicada (replay detectado)." });
    }    

    next();
};
