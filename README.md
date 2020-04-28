# notes-api
API to keep and organize user's notes

# Run:

```
npm install
node sever/ || nodemon server/
```
### Run with docker:

```
docker-compose up
```

# Migrate the database
On ./server/database/ run:
```
npx sequelize-cli db:migrate
```

# Seed the databaase
On ./server/database/ run:
```
npx sequelize-cli db:seed:all
```
