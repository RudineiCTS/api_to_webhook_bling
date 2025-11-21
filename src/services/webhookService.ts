import { WebhookPayload, WebhookResponse } from '../types/webhookTypes';
import { SQLService } from './sqlService';

interface ResultSqlServer {
  Sucesso : number;
  Status: string
}
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
  static async validateEventoId(eventoId: string) {
  try {
    const result = await SQLService.VerificaEventoId(eventoId);

    // Caso evento duplicado
    if ('replay' in result) {
      return {
        success: false,
        replay: true,
        message: 'Evento já registrado (REPLAY).',
        eventId: eventoId
      };
    }

    // Caso erro inesperado
    if ('error' in result) {
      return {
        success: false,
        error: true,
        detail: result.detail,
        message: 'Erro ao registrar evento no SQL Server.'
      };
    }

    // Caso evento NOVO
    return {
      success: true,
      message: 'Evento registrado com sucesso!',
      registeredAt: new Date().toISOString(),
      eventId: eventoId
    };

  } catch (error) {
    console.error('❌ Erro no processamento do webhook:', error);
    throw new Error('Falhou o processamento do webhook');
  }
}

}