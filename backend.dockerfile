FROM mcr.microsoft.com/dotnet/sdk:6.0.401-focal-amd64 AS build-env
WORKDIR /app

COPY . .

RUN dotnet restore App/Api/Api.csproj
RUN dotnet restore App/Application/Application.csproj
RUN dotnet restore App/Infrastructure/Infrastructure.csproj
RUN dotnet restore App/Model/Model.csproj
RUN dotnet restore App/Persistence/Persistence.csproj
RUN dotnet restore Tests/Application.UnitTests/Application.UnitTests.csproj
RUN dotnet publish -c Release -o out

# Run
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .

EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "Api.dll"]