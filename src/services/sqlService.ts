import { sqlServerConnection } from "../database/sqlServer";
import { WebhookPayload } from "../types/webhookTypes";

interface IProcedureResult {
  Sucesso: number;
  Status: string;
}

interface IReplayResult {
  replay: true;
}

interface IErrorResult {
  error: true;
  detail: any;
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
  
 static async VerificaEventoId(uniqueIdEvento: string)
: Promise<IProcedureResult | IReplayResult | IErrorResult> 
{
  try {
    const pool = await sqlServerConnection();

    const result = await pool
      .request()
      .input("UniqueId", uniqueIdEvento)
      .execute("dbo.uspRegistrarWebhook");

    const row = result.recordset?.[0];

    if (!row) {
      return { error: true, detail: "Resultado inesperado da procedure" };
    }

    // Evento duplicado (REPLAY)
    if (row.Sucesso === 0 && row.Status === 'REPLAY') {
      return { replay: true };
    }

    // Evento novo
    return row as IProcedureResult;

  } catch (error: any) {
    console.error("❌ Erro inesperado ao executar procedure:", error);
    return { error: true, detail: error };
  }
}
}
