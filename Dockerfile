FROM node:20.11.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN node --max-old-space-size=8192 /usr/local/bin/ng build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/* /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
