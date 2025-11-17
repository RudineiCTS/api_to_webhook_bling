import {Router} from 'express';
import { WebhookController } from '../controllers/webhookWebController';


const webhookRoutes = Router();

webhookRoutes.post('/webhook',WebhookController.handleWebhook)

export default webhookRoutes;