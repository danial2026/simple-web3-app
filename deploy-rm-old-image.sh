 #!/bin/bash
echo ' >> start'

cd /root/danialsWebSite/simple-web3-app

git pull

docker stop danialbcsite || docker rm danialbcsite

docker-compose up -d