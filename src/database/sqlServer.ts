import sql from "mssql";

const config: sql.config = {
  server: "SOLADM-281\\SQLEXPRESS01",
  database: "NOME_DO_SEU_BANCO",
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  authentication: {
    type: "ntlm",
    options: {
      userName: "",  // deixe vazio para Windows Auth
      password: "",
      domain: "SOLFARMA" // aparece na imagem: "SOLFARMA\rudinei.cferreira"
    }
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
