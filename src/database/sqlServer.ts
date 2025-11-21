import 'dotenv/config';

import sql from "mssql";

export const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "Zanup",
  server: "DBTOTVS\\DBTOTVS",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};


export const sqlServerConnection = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log("🟢 Conectado ao SQL Server usando login SQL.");
    return pool;
  } catch (error) {
    console.error("❌ Erro ao conectar ao SQL Server:", error);
    throw error;
  }
};
