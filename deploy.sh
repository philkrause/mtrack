dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp3.1/publish

docker build -t mtrack-image  ./bin/release/netcoreapp3.1/publish

docker tag mtrack-image registry.heroku.com/mflighttrack/web

heroku container:push web --app mflighttrack

heroku container:release web -a mflighttrack
