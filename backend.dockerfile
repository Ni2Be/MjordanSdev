FROM mcr.microsoft.com/dotnet/sdk:6.0.401-focal-amd64 AS build-env
WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o out

# Run
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .

ENV EmailConfiguration:FromName "Secret_0"
ENV EmailConfiguration:FromMail "Secret_1"
ENV EmailConfiguration:SmtpServer "Secret_2"
ENV EmailConfiguration:Port "Secret_3"
ENV EmailConfiguration:UserName "Secret_4"
ENV EmailConfiguration:Password "Secret_5"
ENV ReCaptchaConfig:SecretKey "Secret_6"
EXPOSE 80/tcp

ENTRYPOINT ["dotnet", "Api.dll"]