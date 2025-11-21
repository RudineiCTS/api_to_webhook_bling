import 'dotenv/config';
import sql from "mssql/msnodesqlv8";

const config: sql.config = {
  server: "DBTOTVS", // nome do servidor
  database: "Zanup",
  authentication: {
    type: "default", // login SQL Server
    options: {
      userName: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD
    }
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: "DBTOTVS" // sua instância DBTOTVS\DBTOTVS
  }
};

export const sqlServerConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("🟢 Conectado ao SQL Server usando login SQL.");
    return pool;
  } catch (error) {
    console.error("❌ Erro ao conectar ao SQL Server:", error);
    throw error;
  }
};
