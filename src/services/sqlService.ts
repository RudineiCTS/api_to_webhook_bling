import { sqlServerConnection } from "../database/sqlServer";
import { WebhookPayload } from "../types/webhookTypes";

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
        .input("INvhcEventoId",uniqueIdEvento)
        .execute("dbo.uspRegistraWebhook");

      return result
    }catch(error){
      console.error("❌ Erro ao executar procedure:", error);
      throw error;
    }
  }
}
