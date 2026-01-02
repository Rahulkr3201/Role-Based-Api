1. First, we set up index.js using Express. We also use dotenv for handling environment variables and apply app.use(express.json()) so Express can handle JSON data.

2. Then, we create a database connection in the config folder and connect MongoDB using Mongoose. This dbConnect function is imported into index.js and executed there so the database connects when the server starts.

3. Next, we create a schema inside the models folder using mongoose.Schema, define the required fields, and export the model.

4. In the auth controller, we import the User schema to handle register and login functionality.

5. When an API call is made, the email and password travel to the backend securely over HTTPS through req.body, not via the URL or query parameters. This prevents the data from being altered in transit.

6. When registering, we hash the password and store it in the database. During login, the user is found using the email, and the entered password is compared with the stored hashed password. If they match, a response is sent and a JWT token is generated so the user does not need to log in every time.
7. We do not send the token directly in the response because it is unsafe if it falls into the wrong hands. Instead, we store the token in an HTTP-only cookie, which ensures secure storage and reliable transmission.
   JWT handles authentication, while cookies handle secure storage and automatic transmission. The JWT is protected inside the HTTP-only cookie. On every request, the token is sent automatically; if it is verified, the user remains logged in. Otherwise, the user must log in again.

8. We then create two middleware functions:

verifyToken to verify the user using the JWT

authorizedRoles for role-based access control

In authorizedRoles, we extract the user role from req.user (decoded from the token) and check if it exists in the allowed roles. If it does, the request is allowed; otherwise, access is denied.

This completes the role-based authentication and authorization API.
