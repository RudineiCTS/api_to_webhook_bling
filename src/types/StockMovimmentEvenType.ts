export interface StockMovimment {
  produto: {
    id: number;
  };
  deposito: {
    id: number;
    saldoFisico: number;
    saldoVirtual: number;
  };
  operacao: string; // "E" (entrada) ou "S" (saída)
  quantidade: number;
  saldoFisicoTotal: number;
  saldoVirtualTotal: number;
}
