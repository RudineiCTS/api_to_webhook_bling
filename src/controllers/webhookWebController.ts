import { Request, Response } from "express";
import { WebhookService } from "../services/webhookService";

export class WebhookController {
    static async handleWebhook(req: Request, res: Response) {
        try {
            // O protectReplay colocou o JSON parseado aqui
            const data = (req as any).jsonBody;   

            if (!data) {
                return res.status(400).json({ error: "JSON não encontrado após validação." });
            }

            
            await WebhookService.processWebhook(data);

            return res.status(200).json({ message: "Webhook recebido com sucesso" });

        } catch (error: any) {
            console.error("Erro ao processar webhook:", error);
            return res.status(500).json({ error: "Erro interno ao processar webhook" });
        }
    }
}
