export interface WebhookPayload {
  eventId: string;
  date: string;
  version: string;
  event:string;
  companyId:string;
  data: any

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
    data: any

}


