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

A webserver will start on PORT 5000

## ENDPOINTS

### Register

POST at `/auth/register` \
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

### Change Username
 
POST at `/auth/changeusername` \
Headers: 
{
    ...,
    'Authorization': authToken
} 
Payload: 
{
    "email": <>
    "newUserName": <>
} 

### Reset Password

POST at `/auth/resetpassword` \
Headers: 
{
    ...,
    'Authorization': authToken
} \
Payload: 
{
    "email": <>
    "newPassword": <>
    "newPasswordAgain": <>
} 

### Get user details

GET at `/user` \
Headers: 
{
    ...,
    'Authorization': authToken
}

### Delete user details:

DELETE at `/user` \
Headers: 
{
    ...,
    'Authorization': authToken
}




