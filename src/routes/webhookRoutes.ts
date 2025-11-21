import {Router, raw} from 'express';
import { WebhookController } from '../controllers/webhookWebController';
import { protectReplay } from '../middleware/replayAttackValidates';


const webhookRoutes = Router();

webhookRoutes.post(
    '/webhook', 
    raw({type: '*/*'}),
    protectReplay, 
    WebhookController.handleWebhook)

export default webhookRoutes;