

# Update EF tools
dotnet tool update --global dotnet-ef
# Add migration
dotnet ef migrations -s ./Api/ -p ./Persistence/ add 