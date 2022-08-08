FROM node:14.9

WORKDIR /app

RUN useradd -m -r user \
  && chown -R user:user /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
USER user
