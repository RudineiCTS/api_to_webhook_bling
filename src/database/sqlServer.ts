import sql from "mssql/msnodesqlv8"; // Importe do msnodesqlv8

const config = {
  server: "DBTOTVS\\DBTOTVS",
  database: "Zanup",
  options: {
    trustedConnection: true, // Habilita autenticação Windows
    encrypt: false,
    trustServerCertificate: true
  }
  
};

export const sqlServerConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("🟢 Conectado ao SQL Server com Autenticação Windows");
    return pool;
  } catch (error) {
    console.error("❌ Erro ao conectar ao SQL Server:", error);
    throw error;
  }
};