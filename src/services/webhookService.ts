import { pathToFileURL } from 'url';
import { WebhookPayload, WebhookResponse } from '../types/webhookTypes';
import { SQLService } from './sqlService';

export class WebhookService {
  static async processWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    try {
      console.log('Processing webhook:', payload);
      
      
      SQLService.salvarEvento(payload.data, payload.event)
      
      return {
        success: true,
        message: 'Webhook processed successfully',
        processedAt: new Date().toISOString(),
        eventId: `evt_${Date.now()}`
      };
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw new Error('Failed to process webhook');
    }
  }

  static validateSignature(payload: WebhookPayload, signature: string): boolean {
    // Implementar validação de assinatura
    return true; // Placeholder
  }
}