import express from 'express';
import webhookRoutes from './routes/webhookRoutes';

const app = express();

app.use(express.json());
app.use('/api', webhookRoutes);


app.listen(3000, () => {
  console.log(`🚀 Server running on port ${3000}`);
  console.log(`📍 Health check: http://localhost:${3000}/health`);
});

export default app
