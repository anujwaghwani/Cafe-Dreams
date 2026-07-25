# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy root workspace config and user-app package.json
COPY package*.json ./
COPY packages/user-app/package.json ./packages/user-app/

# Install dependencies using npm workspaces
RUN npm install

# Copy user-app source code
COPY packages/user-app ./packages/user-app

# Build the Vite application
WORKDIR /app/packages/user-app
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built assets from Vite's dist folder
COPY --from=build /app/packages/user-app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
