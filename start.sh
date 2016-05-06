#to make sure we have the latest ones
#important this happens on dev too?
#rm -rf node_modules
hash=$(git log --pretty=format:'%h' -n 1)
lastHash=$(git log --pretty=format:'%h' -n 2 | tail -1)
echo "current commit: $hash"
echo "installing npm libraries"
docker run -v $(pwd):/srv/app -w /srv/app amlwwalker/docker-node-python-dev:latest
echo "starting node app"
#stop the current container
docker stop -t 1 exampleapp$lastHash
docker rm exampleapp$lastHash
#for development
docker run -p 3000:3000 -v $(pwd):/srv/app -w /srv/app -e HOSTNAME=$(docker-machine ip default) --env-file ~/envVars.cfg amlwwalker/docker-node-python:latest
#docker run -p 3000:3000 -v $(pwd):/srv/app -w /srv/app --env-file ~/envVars.cfg amlwwalker/docker-node-python-prod:latest
