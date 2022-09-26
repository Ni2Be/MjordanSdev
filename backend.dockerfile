# Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

COPY ./MjordanSdev.sln ./MjordanSdev.sln
COPY ./App/Api/Api.csproj ./App/Api/Api.csproj
COPY ./App/Application/Application.csproj ./App/Application/Application.csproj
COPY ./App/Infrastructure/Infrastructure.csproj ./App/Infrastructure/Infrastructure.csproj
COPY ./App/Model/Model.csproj ./App/Model/Model.csproj
COPY ./App/Persistence/Persistence.csproj ./App/Persistence/Persistence.csproj
COPY ./Tests/Application.UnitTests/Application.UnitTests.csproj ./Tests/Application.UnitTests/Application.UnitTests.csproj
RUN dotnet restore ./MjordanSdev.sln
COPY . .
RUN dotnet publish -c Release -o out

# Run
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "Api.dll"]