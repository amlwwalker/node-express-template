hash=$(git log --pretty=format:'%h' -n 1)
echo "current commit: $hash"
echo "installing npm libraries"
docker run -v $(pwd):/srv/app -w /srv/app iron/node:dev npm install
echo "starting node app"
docker run --rm --name template -p 3000:3000 -v $(pwd):/srv/app -w /srv/app iron/node node app.js