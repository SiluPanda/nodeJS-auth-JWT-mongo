![node-js-736399](https://user-images.githubusercontent.com/31051721/134802435-a2ac2c64-d7ad-4d9d-945c-a2cb464d31da.png)



## SET UP

Create a file `.env` and add values for following parameters

MONGO_URI=<> \
PASSWORD_ENCRYPTION_KEY=<> \
JWT_SEC=<> \
EMAIL=<> \
PASSWORD=<> \

Install node dependencies

`npm i`

Start server

`node app.js`


## ENDPOINTS

### Register

POST at `/auth/register`
Payload:
{
    "username": <>,
    "password": <>,
    "email": <>
}

### Verify Email
 
POST at `/auth/verify` \
Payload:
{
    "verificationCode: <>
    "email": <>
}

### Login

POST at `/auth/login` \
Payload:
{
    "email": <>,
    "password": <>
}

Returns:
{
    "authToken": <>
}

# 




