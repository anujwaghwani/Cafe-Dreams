# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy root workspace config and admin-app package.json
COPY package*.json ./
COPY packages/admin-app/package.json ./packages/admin-app/

# Install dependencies using npm workspaces
RUN npm install

# Copy admin-app source code
COPY packages/admin-app ./packages/admin-app

# Build the Vite application
WORKDIR /app/packages/admin-app
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the built assets from Vite's dist folder
COPY --from=build /app/packages/admin-app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
