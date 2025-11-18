import sql from "mssql";

const config = {
  server: "127.0.0.1",
  port: 1433,
  database: "NORTHWND",
  user: "api",
  password: "123456",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};



export const sqlServerConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("🟢 Conectado ao SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Erro ao conectar ao SQL Server:", error);
    throw error;
  }
};
