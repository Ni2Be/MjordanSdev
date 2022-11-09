FROM mcr.microsoft.com/dotnet/sdk:7.0.0-focal-amd64 AS build-env
WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o out

# Run
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .

ENV mjordansdev_secrets_FILE ""
ENV AllowedOrigins "https://mjordans.dev;https://www.mjordans.dev;"
EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "Api.dll"]