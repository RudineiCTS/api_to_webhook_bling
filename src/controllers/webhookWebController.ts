import { Request, Response } from 'express';
import { WebhookService } from '../services/webhookService';
import { WebhookPayload } from '../types/webhookTypes';

export class WebhookController{
    static async handleWebhook(req:Request , res:Response ){
        try {
            const payload = req.body;
            console.log(req.body)
            const signature = req.headers['x-signature'] as string;

            if(!payload.event){
                return res.status(400).json({success: false, error: 'Event type is required'})
            }
            // const result = await WebhookService.processWebhook(payload);
            res.status(200).json(payload);
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