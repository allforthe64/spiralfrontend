<h1>Discover Spiral: The Frontend</h1>
<br>
I am a huge gym rat. Something about going to the gym, racking up an absurd ammount of weight and trying to lift it speaks to me. But one thing I 
don't enjoy, is writing complex, heavy code. So I decided to learn ReactJS :p. I knew going in that React would allow me to write lighter, easier to read code and I had a brilliant idea: why not use the power of lightweight code to build a website about jacking heavy weights? And just like that, the Mogged
Supplement Company was born. Read on to see how I combined two of my passions into one epic project:
<br>
<br> 
<br>
<br>
<div align='center'>
  <img width='50%' src='https://media.giphy.com/media/Vwf0G57SrWa4bqkouc/giphy.gif'/>
</div>
<br>
<h1>How It's Made:</h1>
<br>

**Tech Used:** Adobe XD, HTML, CSS, ReactJS
<br>
<p>I started by building out prototypes in Adobe XD. This project was very brand focus, so I made sure to make each page convey the image and message
of the company. I also kept my target audience at the forefront of my thoughts, making sure the pages had the boldness and over the top styling I was 
looking for.</p>
<br>
<p>Since I was using this project as a functional way to flex my new React skills, I wanted to make sure I had a variety of diverse features. Mogged is built using exclusively functional components which I really enjoyed writing. Having the ability to write Javascript code and markup in the same file was a huge advantage gained over regular HTML/Javascript. I also wanted to take advantage of React's ability to easily implement single page web design to help speed up load times and simplify the building process. I hooked up all my pages using the react-router-dom library.</p>
<br>
<p>To build the shop and shopping cart pages, I again took advantage of React's blend of Javascript and markup. Using map methods, I dynamically generated components based on information stored in JSON files. This is also how I created the three main product cards on the Mogged homepage. For the contact page, I used React's useRef to clear out the forms. If I was building the site for a company that actually exists, this is also how I would have captured and stored the data from the contact form. And finally, I built the shopping cart. The system uses a combination of localStorage and React useState to track what the user has added to their cart, as well as how many of each item they would like to order.</p>
<br>
<p>For styling, I used exclusively flexbox, as I find it to be simple and intuitive for website layout and design. Using a little planning and foresight, I was able to setup all of my containers in a way that allowed me to easily opotimize the site for mobile. As I mentioned above, branding was really important for this project, so I put a lot of effort into making sure that each page conveyed Mogged's message to the best of its abilities. And as a final sidenote, all copy and images were produced by yours truly.</p>
<br>
<h1>Areas To Improve</h1>
<br>
<p>As proud as I am of the shopping cart system, I'll be the first to admit that it could use some work. One issue I ran into was updating components as items were added or removed from the cart, since this required each component to be re-rendered. I did this using window reloads, but I probably should have used React's useEffect hook to re-render the page when the shopping cart was changed. I had to write all of my functions for the shopping cart in the App component and pass them using props, but there's a better solution out there that uses React's useContext. Not using context also caused me to use localStorage instead of useState, since I needed a variable that could be accessed from multiple components.</p>
<br>
<h1>Lessons I Learned</h1>
<br>
<p>Through Mogged I learned loads about React and I've never been more excited about a library in my entire coding career. In particular, I really love how easy it is to combine programmatic functionality with style and design. One of the major areas I'm going to have to improve on is my website information architecture and design. This project taught me that I not only have to design systems to pass and manipulate information, but that I have to spend time thinking about how these systems conenct and interact with one another. React heavily rewards those that take the time to plan out their paths before they build them and its going to take some time before I fully master the art of thinking ahead in React.</p>
<br>
<p>I also learned how important it is to conduct research on the libraries you're using and the methods that come with them. React is a very feature diverse library and Mogged really only scratches the surface of what it can do. In the future, I look forward to unlocking its full capabilities and really seeing what React can do.</p>
