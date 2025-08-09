import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const fastify = Fastify({
  logger: true
});

// Register plugins
await fastify.register(cors, {
  origin: true
});

await fastify.register(helmet);

// Routes
fastify.get('/', async (request, reply) => {
  return { 
    message: 'Welcome to {{name}} API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };
});

fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
});

// Start server
try {
  const port = process.env.PORT || 3000;
  await fastify.listen({ port: Number(port), host: '0.0.0.0' });
  console.log(`🚀 {{name}} server running on port ${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
