// Environment variables template
export const envTemplate = `# Environment Variables for {{name}}

# Application
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=mongodb://localhost:27017/{{name}}
POSTGRES_URL=postgresql://admin:password@localhost:5432/{{name}}

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# API Keys (add your own)
API_KEY=your-api-key-here

# External Services
REDIS_URL=redis://localhost:6379

# Development
DEBUG=true
LOG_LEVEL=debug

# Production (uncomment when deploying)
# NODE_ENV=production
# LOG_LEVEL=info
# DEBUG=false
`;
