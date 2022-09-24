FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /app 

# copy csproj and restore as distinct layers
#COPY *.csproj ./
#RUN dotnet restore

# copy everything else and build app
COPY . ./app
RUN dotnet restore
WORKDIR /app
RUN dotnet publish -c Release -o publish 

FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet sdg-react-template.dll
ENTRYPOINT ["dotnet", "sdg-react-template.dll"]
