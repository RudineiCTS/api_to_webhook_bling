import { WebhookPayload, WebhookResponse } from '../types/webhookTypes';
import { SQLService } from './sqlService';

export class WebhookService {
  static async processWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    try {

      SQLService.salvarEvento(payload)
      
      return {
        success: true,
        message: 'Webhook processado com sucesso!',
        processedAt: new Date().toISOString(),
        eventId: `evt_${Date.now()}`
      };
    } catch (error) {
      console.error('Erro no processamento do webhook:', error);
      throw new Error('Falhou o processamento do webhook');
    }
  }
  static async validateEventoId(eventoId:string){
    try {

      const result = await SQLService.VerificaEventoId(eventoId)
      console.log(result);
      return {
        success: true,
        message: 'Webhook processado com sucesso!',
        processedAt: new Date().toISOString(),
        eventId: `evt_${Date.now()}`
      };
    } catch (error) {
      console.error('Erro no processamento do webhook:', error);
      throw new Error('Falhou o processamento do webhook');
    }
  }
}