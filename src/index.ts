import express from 'express';
import webhookRoutes from './routes/webhookRoutes';
import 'dotenv/config';



const app = express();

app.use(express.json());
app.use('/api', webhookRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
});

export default app
