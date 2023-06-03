# Chuck-Norris-Joke-app
A task that I have to solve in order to advance to the next step of the interview. A full stack application made with NodeJs and React

The application works so that the user must first register, after which he will receive an email and his data will be saved in the database. After that, the user will be able to log in and watch jokes about Chuck Norris.

# Backend
The application is written in typescript.
It has two controllers. 
One serves us for authentication. There are two routes on it that we use for registration and login. After successful registration, you will receive an email welcoming you to a community where only Chuck Norris jokes are told.


<img width="326" style="margin: 0 auto;" alt="emailExample" src="https://github.com/AdrianVucko/Chuck-Norris-Joke-app/assets/129105028/e39f189d-8a22-4a10-acfe-aeb47ebd5c83">



The second serves us as our api which is protected by midellwear. Every time a user calls a route, he must go through an authorization process in which his Jwt token, which he received after logging in, is validated. 
/api/chuck route is used to retrieve one random Chuck Norris joke.

I created the /api/me route in case the user exits or refreshes the page. When one of the two happens, the user will be logged in automatically because they will pass their token from the local storage. That token is then decoded in order to extract the necessary data and return the user from the database.

I used mysql combined with TypeORM for the database. The database contains only one entity "user".

![userTable](https://github.com/AdrianVucko/Chuck-Norris-Joke-app/assets/129105028/08343562-2a34-4475-8287-0f98e751480c)

All attributes except "salt" were mandatory. I used crypto to hash the password. First, I created a random salt that serves us to hash the password and confirm it at login, which is why it must be saved in the database because if the salt is wrong, the password will be wrong too.

For testing I used Jest because it is the most popular choice these days.

<img width="384" alt="testShow" src="https://github.com/AdrianVucko/Chuck-Norris-Joke-app/assets/129105028/b63d85e9-d37b-469a-a5ca-042f91209800">


I also used ESLint for avoiding any potential bugs and Prettier for formating my code so it's more readable.

# Frontend
This task was really meant to be backend only. I only realized this after I had done most of the frontend. That's why I won't go into too much detail about the frontend. If you are still interested, there is a video presentation in which I show the full functionality of the application called "presentation.mp4". It shouldn't take too much of your time since it's only 1 minute and 48 seconds long. In addition to the video, there is also the source code.

In short, the frontend is made in React with typescript. I used tailwind for css because it speeds up the process a lot. It is fully responsive.
