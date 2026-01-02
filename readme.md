1. first setup index.js use express for that . and also use doenv for handling env.use app.use for express to handle json

2. then we made the database dbcoonnect in configuration and connected the databse using mongodbid using moongoose.and bring that dbconnect in index.js to make it run in index.js file .

3. create a schema inside the model using moongose new schema and fill its requirement and exports

4. now in auth controller import the User schema to use in login and register.
5. when we make api call . the pemail and paswrod travel to backend using Https from req.body , not with the api call . so it cant be altered in between .
6. we recieve the passwor we hash them and then push to the database. when user login the same user is found on the basic of username ans the password of username and entered now is equal then send the res. we also generate the token so thet user dont have to login evrytime it just remind the server of that user. we dont directly senf the token it is not safe as if it gets in wrong hand it will be bad . we try to send token in cookies which enssured the transportation reliablility because fo its httponly transport protocol. jwt handles the authentication but cookie handle secure storage of token and automatic transmission. jwt protected inside httponly cookie.on every request token is send if it is verified it good . its not user has to agaun login. it is send client evertime with request.

7.
