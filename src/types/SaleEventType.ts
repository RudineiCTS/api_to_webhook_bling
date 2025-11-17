export interface Sale{
    id:number;
    data:string;
    numero: number;
    numeroLoja: string;
    total: number;
    contato: Contato;
    vendedor: Vendedor;
    loja:Loja
}

export interface Contato{
    id: string;
}
export interface Vendedor{
    id:string;
}
export interface Loja{
    id:string;
}

