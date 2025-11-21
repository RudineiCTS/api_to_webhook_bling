import {Router} from 'express';
import { WebhookController } from '../controllers/webhookWebController';
import { protectReplay } from '../middleware/replayAttackValidates';


const webhookRoutes = Router();

webhookRoutes.post('/webhook',protectReplay, WebhookController.handleWebhook)

export default webhookRoutes;