<h1>Discover Spiral: The Frontend</h1>
<br>
For this project, I teamed up with my Mom (who was also learning web development at the time) to create an online learning platform for kids everywhere. Being a homeschool student, my Mom has been my main resource when comes to finding new tools, tutorials, or even just ideas for cool projects. We thought it would be awesome to create a sort of database for all of the neat tutorials, projects, and skills we've found together and share it with the world for everyone to use. As such, this project had a lot of personal value for both of us, so we put in a lot of effort to get the website looking and feeling just right. We'd been practicing building with the MERN stack, so we decided to use this project to put our skills to the test. We also wanted to use TypeScript Tailwind CSS to style the app, neither of which we'd used before. Read on to see how everything turned out:
<br>
<br> 
<br>
<br>
<div align='center'>
  <img width='50%' src='https://media.giphy.com/media/8JHCsfucYOYnEWcv8Y/giphy.gif'/>
</div>
<br>
<h1>How It's Made:</h1>
<br>

**Tech Used:** React.js, TypeScript, Tailwind CSS  
<br>
<p>Unlike how I build most of my projects, we actually opted not to use Adobe XD for this project and instead used simple sketches for each page to decide how the site should look. We new that we wanted to have several informational graphics appear on screen and we wanted to incorporate motion with those graphics to keep the pages interesting. We kept our designs fairly clean and simple, utilizing lots of negative space to draw the user's attention to the content being displayed. </p>
<br>
<p>We wanted to use this project as a means of practicing with the MERN stack, so naturally we used React.js to build out the frontend of the app. Functionally, the frontend didn't need to do much other than some basic CRUD operations and for this we used Axios, which allowed us to setup request controller and make private requests to our backend. It was important that our CRUD operations had the proper authentication protocols setup and Axios was crucial for making sure that only users with the right kind of account could make requests. Once we had our data, it was easy to use react hooks and JSX to map over and display it.</p>
<br>
<p>We used JWTs coming from our backend to authenticate users and used React's Context API to pass the authentication data to pages in different areas of the website. We also used the Context API to make a kind of prefetch component: when our app renders for the first time, it will attempt to fetch resources from the backend and fail, because the user hasn't been logged in yet. Once the user has either signed up or logged in, it will try to request the resources from the backend again and passes them through the website using the Context API. We then listen for the users to make any changes to the data (like adding a resource to their favorites list) and send another request to update the user. We then refetch the updated user and pass it through the site using Context.</p>
<br>
<p>To beef up the graphics on our pages, we used a combination of Tailwind CSS and react-animate-on-scroll. Tailwind made it super simple to quickly style components and optomize them for all screen sizes, allowing us to spend less time styling and more time developing the logic for our app. We used the RAOS components to add motion to our pages, keeping things interesting for users as they navigate the site. Spiral is a very information rich project, so it was important to present the information in a way that didn't bore users. By using the motion components, we were able to present our information in fun and interesting ways, which I think went a long way towards imrpoving the overall look of the app.</p>
<br>
<h1>Areas To Improve</h1>
<br>
<p>As proud as I am of the shopping cart system, I'll be the first to admit that it could use some work. One issue I ran into was updating components as items were added or removed from the cart, since this required each component to be re-rendered. I did this using window reloads, but I probably should have used React's useEffect hook to re-render the page when the shopping cart was changed. I had to write all of my functions for the shopping cart in the App component and pass them using props, but there's a better solution out there that uses React's useContext. Not using context also caused me to use localStorage instead of useState, since I needed a variable that could be accessed from multiple components.</p>
<br>
<h1>Lessons I Learned</h1>
<br>
<p>This project was my second major project with React.js (Mogged was the first) and boy did we step up the game for this one. I got to use the whole suite of different React hooks, including all of the basics (useState, useEffect, useContext, etc.). Using Axios for the first time was a great experience as well and gave me much more control over my requests than I thought was possilbe. In addition, using Typescript was a real learning experience and I certainly had to pay a bit more attention to how I was assigning data and where I was sending it. to</p>
<br>
<p>Finally, I thought we did a much better job of planning ahead and blocking out the website before we started developing (compared to Mogged). Our pages were split up into much smaller, easy to build components, which was much different from the large bulky components I used for Mogged. Smaller components made it so I could focus my efforts in one area and get tasks done quickly, which was great since it allowed me to build, test, and deploy without spending too much time on one component.</p>
<p>Remember, this is only the frontend of this app! Go checkout the backend repo to read about how managed the data and sent it to this React app using the other three letters in the MERN stack. Until next time, peace &#9996</p>
