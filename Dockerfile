ARG NODE_VERSION=21.5.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

#RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=package-lock.json,target=package-lock.json \
#    npm ci --omit=dev

# Copy package.json and package-lock.json first for layer caching
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY start.sh ./

COPY . .

# Make the start script executable
RUN npx prisma generate

RUN chmod +x ./start.sh

# Expose the port that the app will run on
EXPOSE 3000

# Run the start script
CMD ["./start.sh"]

