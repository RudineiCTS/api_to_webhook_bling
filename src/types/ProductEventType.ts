export interface Product {
  id: number;
  nome: string;
  codigo: string;
  tipo: string;
  situacao: string;
  preco: number;
  unidade: string;
  formato: string;
  idProdutoPai: number;
  categoria: {
    id: number;
  };
  descricaoCurta: string;
  descricaoComplementar: string;
}
