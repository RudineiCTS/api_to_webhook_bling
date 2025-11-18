import { sqlServerConnection } from "../database/sqlServer";

export class SQLService {
  static async salvarEvento(dataDeExecucao: Date, eventoType: string) {
    try {
      const pool = await sqlServerConnection();

      const result = await pool
        .request()    
        .input("eventoType", eventoType)
        .execute("dbo.recebeinformacaoteste");

      console.log("🟢 Procedure executada:", result.rowsAffected);
      return result;

    } catch (error) {
      console.error("❌ Erro ao executar procedure:", error);
      throw error;
    }
  }
}
