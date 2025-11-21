import { sqlServerConnection } from "../database/sqlServer";
import { WebhookPayload } from "../types/webhookTypes";

interface IResultadoWebhook {
  Sucesso: number;
  Status: string;
}


export class SQLService {
  static async salvarEvento(payload: WebhookPayload) {
    try {
      const pool = await sqlServerConnection();

      const result = await pool
        .request()    
        .input("INvchEvento", payload.event)
        .input("INvchJsonRetorno", JSON.stringify(payload.data))     
        .execute("dbo.uspBuscaRetornoWebhooks");

      console.log("🟢 Procedure executada:", result.rowsAffected);
      return result;

    } catch (error) {
      console.error("❌ Erro ao executar procedure:", error);
      throw error;
    }
  }
  
  static async VerificaEventoId(uniqueIdEvento: string){
    try{
      const pool = await sqlServerConnection();

      const result = await pool
        .request()
        .input("UniqueId",uniqueIdEvento)
        .execute("dbo.uspRegistrarWebhook");
        

      return result
    }catch(error:any){
    if (error.number === 2627 || error.number === 2601) {
      console.warn(`⚠ Evento duplicado ignorado: ${uniqueIdEvento}`);
      return { duplicated: true };
    }
    console.error("❌ Erro inesperado ao executar procedure:", error);
    return { error: true, detail: error };
    }
  }
}
