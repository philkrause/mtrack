
dotnet publish -c Release

#mkdir -p ./bin/release/netcoreapp3.1/publish 

cp dockerfile ./bin/Release/netcoreapp3.1/publish

docker build -t mtrack-image ./bin/Release/netcoreapp3.1/publish

sudo docker tag mtrack-image registry.heroku.com/mflighttrack/web

docker push registry.heroku.com/mflighttrack/web

#heroku container:push web --app mflightrack
heroku container:release web -a mflighttrack
