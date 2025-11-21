import { NextFunction, Request, Response } from 'express';
import { verifyBlingSignature } from "../utils/compareHash";
import { WebhookService } from '../services/webhookService';
import 'dotenv/config';

export const protectReplay = async (req: Request, res: Response, next: NextFunction) => {

    const rawBody = req.body; // é um Buffer
    const signature = req.header("X-Bling-Signature-256") as string | undefined;

    // 1. Verificar assinatura do Bling usando RAW BODY
    const isValid = verifyBlingSignature(rawBody, signature, process.env.BLING_CLIENT_SECRET!);

    if (!isValid) {
        return res.status(401).send("Assinatura inválida");
    }

    // 2. Agora sim: parse do JSON após a validação
    let jsonBody: any;
    try {
        jsonBody = JSON.parse(rawBody.toString("utf-8"));
    } catch (err) {
        return res.status(400).send("Body inválido (JSON parse falhou)");
    }

    // 3. Extrair ID único
    const uniqueId = jsonBody.id || jsonBody.eventId;

    if (!uniqueId) {
        return res.status(400).json({ error: "Nenhum ID único encontrado para proteção de replay." });
    }

    // 4. Validar replay no Redis
    const exists = await WebhookService.validateEventoId(`${uniqueId}`);
    if (exists) {
        return res.status(409).json({ error: "Requisição duplicada (replay detectado)." });
    }

    // 5. Colocar no req.body o JSON parseado para o controller usar
    (req as any).jsonBody = jsonBody;

    next();
};
