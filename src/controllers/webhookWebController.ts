import { Request, Response } from 'express';
import { WebhookService } from '../services/webhookService';
import { WebhookPayload } from '../types/webhookTypes';
import { verifyBlingSignature } from '../utils/compareHash';

export class WebhookController{
    static async handleWebhook(req:Request , res:Response ){
        try {
            const payload = req.body;            
            
            
            const signature = req.header("X-Bling-Signature-256") as string | undefined;             
            const isValid = verifyBlingSignature(req.body, signature, process.env.BLING_CLIENT_SECRET!);

            if (!isValid) {
                return res.status(401).send("Assinatura inválida");
            }
            
            const payloadConverted = payload  as WebhookPayload
            WebhookService.processWebhook(payloadConverted)

            res.status(200).json(payloadConverted);                    
        } catch (error) {
            
            res.status(500).json({
                success: false, 
                error: 'Internal server error', 
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}