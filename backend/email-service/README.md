# Getting Started with Email-Service

1. Run `npm install` to install all the dependencies

2. Duplicate `.env.example` and rename the new file `.env`

3. IMPORTANT: the SMTP_PASSWORD uses a secret key only available to developers. 
    For testing, please contact the developers. 
    Optionally, you can also test the email functionality on peerprep.ryanchuahj.com.

4. Run `npm start` to start the service.

## Congratulations! you have now set up your micro-service locally!

### Testing

To test the user-service, send REST api calls to `http://localhost:3000/api/users`.
This can be done through POSTMAN or the frontend, when completed.
