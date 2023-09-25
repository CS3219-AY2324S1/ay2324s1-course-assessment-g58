# Getting Started with User-Service

1. Run `npm install` to install all the dependencies

2. Duplicate `.env.example` and rename the new file `.env`

3. Create an account at https://supabase.com/ and create a new project

4. Paste supabase project database Uri into `.env`

5. Run `npx prisma generate`

6. Run `npx prisma db push --schema='{PATH TO schema.prisma file}'`. This will only need to be done once to update your local `schema.prisma` to supabase

7. Run `npm start` to start the service.

## Congratulations! you have now set up your micro-service locally!

### Testing

To test the user-service, send REST api calls to `http://localhost:3000/api/users`.
This can be done through POSTMAN or the frontend, when completed.
