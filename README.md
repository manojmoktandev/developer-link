# Developer-link
Deploy Link
https://quiet-reaches-35075.herokuapp.com/

<pre><span class="pl-c1"></span>
# Main theme of project 
</pre>
<pre><span class="pl-c1"></span>
This is a MERN stack application from the "MERN Stack Front To Back" course on Udemy. 
It is a small social network app that includes authentication, profiles and forum posts.
Create a developer profile/portfolio, share posts and get help from other developers
What i have learn is all from udemy course by :
</pre>
<pre><span class="pl-c1"></span>
INSTRUCTOR
Brad Traversy
https://www.udemy.com/course/mern-stack-front-to-back/
</pre>
Build a full stack social network app with React, Redux, Node, Express &amp; MongoDB

Create an extensive backend API with Express

Use Stateless JWT authentication practices

Integrate React with an Express backend in an elegant way

React Hooks, Async/Await &amp; modern practices

Use Redux for state management

Deploy to Heroku with a postbuild script

# Quick Start 🚀

Add or Update a default.json file in config folder with the following
<pre><span class="pl-c1"></span>
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>",
  "gitClientId":"clientid", 
  "githubSecret":"githubsecretkey"
}
</pre>

# Install dependencies
<pre><span class="pl-c1"></span>Install server dependencies
npm install</pre>

<pre><span class="pl-c1"></span>Install client dependencies
cd client
npm install</pre>

<pre><span class="pl-c1"></span>Run both Express & React from root
npm run dev
</pre>

<pre><span class="pl-c1"></span>Build for production
cd  client
npm run build
</pre>

# Deploy project on production mode at Heroku dev center
https://www.heroku.com/
sign up for free
<pre><span class="pl-c1"></span>
Download and Install Heroku cli
after installation for checking heroku install or not open command prompt 
heroku  --version
login heroku 
1. heroku login
 - url open after enter credentials
 added script in package.json under scrips object.
 "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
 change made for production in node server.js
 //Serve static assets in production.
 if (process.env.NODE_ENV==='production') {
    // set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
  }
2.heroku create  ::command for creating application or worspace in heroku dev
3.after create you get application in heroku dashboard.
4.after created  you have to git  initialize repo and  add all  file in respective repo.
5.now  get deploy git command info copy from your heroku application and paste in your  application root. 
6.git push heroku master :: commands compiles  and deploy in heroku application.
7.heroku open ::command to see  you deploy application.
https://quiet-reaches-35075.herokuapp.com/

</pre>

