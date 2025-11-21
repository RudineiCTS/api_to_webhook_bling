import { Request, Response } from 'express';
import { WebhookService } from '../services/webhookService';
import { WebhookPayload } from '../types/webhookTypes';


export class WebhookController{
    static async handleWebhook(req:Request , res:Response ){
        try {
            const raw = req.body;
            const payload = JSON.parse(raw.toString());
            
            
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