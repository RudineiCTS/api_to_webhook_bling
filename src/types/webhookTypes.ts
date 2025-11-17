import { Product } from "./ProductEventType";
import { Sale } from "./SaleEventType";
import { StockMovimment } from "./StockMovimmentEvenType";
import { StockProduct } from "./StockProdutoEventType";

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp?: string;
  signature?: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  processedAt: string;
  eventId?: string;
}

export interface RequestRegister{

    eventId: string;
    date: string;
    version: string;
    event:string;
    companyId:string;
    data: Sale | StockMovimment | Product | StockProduct

}


