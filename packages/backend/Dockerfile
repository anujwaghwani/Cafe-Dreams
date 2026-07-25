FROM node:18-alpine
WORKDIR /app

# Copy root workspace config and backend package.json
COPY package*.json ./
COPY packages/backend/package.json ./packages/backend/

# Install dependencies using npm workspaces
RUN npm install

# Copy backend source code
COPY packages/backend ./packages/backend

# Set working directory to backend
WORKDIR /app/packages/backend

EXPOSE 3001
CMD ["npm", "start"]
