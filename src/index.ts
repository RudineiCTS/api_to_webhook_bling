import express from 'express';
import webhookRoutes from './routes/webhookRoutes';
import logger from "./config/winstonLogger";
import 'dotenv/config';




const app = express();
app.use(express.raw({ type: '*/*' }));

app.use('/api', webhookRoutes);


const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(3000,"0.0.0.0", () => {
 logger.info(`🚀 Server running on port ${PORT}`);
});

export default app
