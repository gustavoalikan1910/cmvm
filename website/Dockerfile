FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# Since we are creating manually, we'll run npm install to generate package-lock inside the container
RUN npm install

COPY . .

# Next.js telemetry disable
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
