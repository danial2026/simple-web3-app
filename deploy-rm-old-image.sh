 #!/bin/bash
echo ' >> start'

git pull

docker stop danialbcsite || docker rm danialbcsite

docker-compose up -d