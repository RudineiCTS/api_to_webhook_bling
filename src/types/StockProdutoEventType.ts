export interface StockProduct {
  produto: {
    id: number;
  };
  saldoFisicoTotal: number;
  saldoVirtualTotal: number;
  vinculoComplexo: boolean;
  depositos: Array<{
    id: number;
    saldoFisico: number;
    saldoVirtual: number;
  }>;
}
