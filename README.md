This is a simple MERN stack application. I have used create-react-app package for initial react setup.

## Can I see the demo of this project?

Yes, the project is deployed in heroku at **https://vast-scrubland-50664.herokuapp.com/**

## What does this project do?

This is simple ticket booking responsive web application, where you can find events along with tickets available for each of them. You can book your tickets with your details.

The live data is used in here. For example: If you book your tickets for an event, the number of available tickets will be reduced accordingly.

## How to run this project in local?

1 Clone the project from this repo
2 Register an account in mlab.com, create a database project with valid credentials. This is required to connect to live database and play with.
3 Go to server/config/config.js file, replace <username> and <password> with your valid credentials, and replace the <database> with the database project name
4 In Node.js command prompt / terminal, run **npm start**
5 In 2 separate command prompts, run **npm start** and **npm run server**
6 Now the project should open at *localhost:3000*