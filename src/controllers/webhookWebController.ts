import { Request, Response } from 'express';
import { WebhookService } from '../services/webhookService';
import { WebhookPayload } from '../types/webhookTypes';
import { webhookQueue } from '../queue/webhookQueue';

export class WebhookController{
    static async handleWebhook(req:Request , res:Response ){
        try {
            const payload = req.body;            
            
            //pega assinatura
            const signature = req.headers['x-signature'] as string;

            //validar assinatura

            if(!payload.event){
                return res.status(400).json({success: false, error: 'Event type is required'})
            }
            res.status(200).json(payload);
            //envia informação para fila
            await webhookQueue.add("webhook-job",payload);
            console.log("📩 Payload recebido e enviado à fila");
        } catch (error) {
            console.error('Webhook error:', error);
            res.status(500).json({
                success: false, 
                error: 'Internal server error', 
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}