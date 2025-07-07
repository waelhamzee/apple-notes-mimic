import { sequelize } from '@/config/db';
import { env } from '@/config/env';
import app from './app';

const startServer = async (): Promise<void> => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
      console.log(`Health check: http://localhost:${env.PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
