# Docker Build
docker build -f frontend.dockerfile -t ghcr.io/ni2be/mjordansdev-frontend:latest .
docker build -f backend.dockerfile -t ghcr.io/ni2be/mjordansdev-backend:latest .
# Docker Deploy
docker swarm init
docker stack deploy --compose-file docker-compose.yaml mjordansdev
docker exec -ti <container> /bin/sh
docker stack rm mjordansdev
# Docker Set Secrets
docker secret create mjordansdev_emailfromname mjordansdev_emailfromname.secret
docker secret create mjordansdev_emailfrommail mjordansdev_emailfrommail.secret
docker secret create mjordansdev_emailsmtp mjordansdev_emailsmtp.secret
docker secret create mjordansdev_emailuser mjordansdev_emailuser.secret
docker secret create mjordansdev_emailpass mjordansdev_emailpass.secret
docker secret create mjordansdev_recaptchasec mjordansdev_recaptchasec.secret

# Update EF tools
dotnet tool update --global dotnet-ef
# Add migration
dotnet ef migrations -s ./Api/ -p ./Persistence/ add 