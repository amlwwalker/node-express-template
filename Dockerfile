FROM iron/node:dev

WORKDIR /srv/app
ADD . /srv/app

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
