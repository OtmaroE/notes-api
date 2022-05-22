# notes-api
API to keep and organize user's notes.

This is an educational API.  
Use and run this API to learn about API design, documentation and local development setup.  
If you wish, you can also deploy this API on a private server or build a UI for it.

# Table of content
1. [Stack](#stack)
2. [Run](#run)
   1. [Run manually](#run-manually)
      1. [Migrate database](#migrate-the-database)
      2. [Seed database](#seed-the-database)
   2. [Run with docker](#run-with-docker)

# Stack
- Node.js.
  - Version 16.4.2 is used as it is current LTS.
  - Node 16.4.2 comes with npm version 7.18.1
- Postgres.
  - Version 10, the oldest version with pending minor releases as of 2022.
- Docker
- Docker-compose
# Run:

### Run manually

Install dependencies
```
npm install 
```
Start server
```
node sever
```
Start server - Development
```
nodemon server/
```

#### Migrate the database
On ./server/database/ inside the container run:
```
npm run db:migrate
```

#### Seed the database
On ./server/database/ inside the container run:
```
npm run db:seed
```


### Run with docker:

```
docker-compose up
```