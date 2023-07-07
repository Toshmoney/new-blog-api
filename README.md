# Getting Started with the api

This project was developed by Toshmoney to teach Toshconsult Technologies Inc student the backend development CRUD operations.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:1000](http://localhost:1000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start`

Launches the app with the normal node index.js method and this doesn't automatically reload pages when there is any changes. You will need to stop and start the application again.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles Node app in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Creating an account
<h2>EndPoints </h2>

Unless otherwise stated all endpoints will have same base url given below:

BASE_URL = 'http://localhost:1000/'

Sign up new user: /register/

The following fields are required:

username
password
Sample request

axios.post(`${BASE_URL}/register/`, {
    username: 'username',
    password: 'password',
})
.then((response) => {
    console.log(response.data)
})
.catch(error => {
    // handle error as appropriate
})
Sample success response

{
    success: true,
    user: {…} // user details
}
Login user: /login/
Method : Post Required fields:

username
password
Sample request

axios.post(`${BASE_URL}/login/`, {
    username: 'username',
    password: 'password'
})
.then((response) => {
    const {data} = response
    console.log(data)
})
.catch(error => {
    // handle error
})
Sample success response

{
    success: true;
    token: ''; // to be sent along all requests require quthorization
    user: {...} // user details
}
GET USER DETAIL: /users/user_id/
Method: GET

NB: user_id is a unique identifier for the user which is gotten after a user has logged in

axios.get(`${BASE_URL}/users/${user_id}/`, {
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
    const {data} = response
    console.log(data)
    })
    .catch(error => {
    console.log(error);
})

GET SINGLE BLOG POST: /:id/

Method: GET

NB: id is a unique identifier for the user which is gotten after a post has been published.

axios.get(`${BASE_URL}/${id}/`, {
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
    const {data} = response
    console.log(data)
    })
    .catch(error => {
    console.log(error);
})
GET ALL BLOG POST: /posts/:id/
Method: GET

NB: id is a unique identifier for the user which is gotten after a post has been published.

axios.get(`${BASE_URL}/posts/${id}/`, {
    headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    })
    .then(response => {
    const {data} = response
    console.log(data)
    })
    .catch(error => {
    console.log(error);
})


