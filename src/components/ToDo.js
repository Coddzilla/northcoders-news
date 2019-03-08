/*

MAKE A SEND COMMENTS FOR MY BACK END


-----

- make different css files for each one

- check W3Schools for different HTML sections

- votes for comments 

- infinate scroll

- make dry code

- make it look better with the topics etc 

- make a css file for every component that I make - do this as I code?

- have topics as their own block for each and make it so that people can choose a picture for their new topic /there is a default picture?

- get them to have a description for the topics?

- <img src="this is the image link" alt="this is an alternative?"/>

- if I reload the page local storage remembers if they have voted before

- shouldn't be able to vote on own article or comment

- use react-chart-js


x As a user, I should be able to view a list of all articles.
x As a user, I should be able to view a list of all articles on a specific topic.
x As a user, I should be able to view an individual article.
x As a user, I should be able to view an individual article's comments.
x As a user, I should be able to sort articles by date created, comment_count & votes
x As a hiring partner with no access to my laptop, I should be able to use the site on my mobile without sacrificing style or functionality.
x As a user, I should be able to login to the site.
x As a hiring partner with no knowledge of the users in the database, it should be very clear to me how I can login to the site.
x As a logged in user, I should be able to post a new article to an existing topic.
x As a logged in user, I should be able to post a new article to a new topic.
x As a logged in user, I should be able to post a new comment to an existing article.
x As a logged in user, I should be able to vote on an article.
x As a logged in user, I should be able to vote on a comment.
x As a logged in user, I should be able to delete my own articles.
x As a logged in user, I should be able to delete my own comments.

- As a hiring parter, I should be able to follow the readme instructions to easily run the project locally.
- As a hiring parter, I should be able to find a link to the hosted version of the project in the readme.
- As a hiring parter, I should be able to find a link to the back-end repository of the project in the readme.
- As a hiring parter, I should be able to find a link to the hosted version of the back-end project in the readme.

# If time...

- As a user, I should be able to navigate over pages of articles (e.g. using pagination or infinite scroll).
- As a user, I should be able to navigate over pages of comments (e.g. using pagination or infinite scroll).
x As a user, I should be able to view a list of all articles written by a specific user.

# Extra credit

- Create a route which shows which users have been most active adding articles and comments
- Make this route sort the users by how popular they are based on an aggregation of their article and comment vote counts
- Implement a filter which re-orders comments based on either the time they were added, or how many votes they have got.

# Note regarding BOLD user stories:

Error handling / error pages to be covered in Thursday's lecture

------ error

// use local storage!
// send username down and set in state of app
// in catch block, setState of status to an error code and depending on the error code, render that component 
 -----error.js
 const error = ({errorSatteus, text}) => {
   const imageref {
     404: 'url',
     400: 'url'
     <etc className=""></etc>
   }
 }

 --- conditional deletion

 pass user down to thing.
 user.username
 handleDelete

 const response= await request.delete('url/article_id');
 return request

 -- navigate 

//  this.props.navigate('/', {state: {articleDeleted: true}})  - this navigates to the home pageis from reachv router so can get from reach router too 
// can have a <p>Article deleted</p> in the navigated page which only renders if second arguent (state- different one) 

can get the second arguent off the this.props.location.state and use this to conditionally render the <p></p>. &&


---- pagination and inifinate scroll 

(turnary for loading to get around the classname error when trying to access the class name)
window.addEventListener('scroll')

// in componentDidMount ass a scroll event listener 
// in scroll event listener, put documen .querySeleetcor('.list').addEventListener(this.handleScroll)


in css make sire height = 100 for list and it's scrollable?

do I need?
// import and install lodash throttle 

in handleScroll put Throttle(event)can console.log event.target.clientHeight etc 

const {client.height, scrollTop, scrollHeight} = event.target;

const distanceFromBottom = scrollHeight - (clientHeight + scrollTop)

fetch more articles when distanceFromBottom < 150px

set a page in state and do fetchArticles to take the page from state 

change the params in the api request 

do the params thing from lecture where the axios takes two things... a url and 

setState to increase the page number by one and do some conditional logic in the ComponentDidUpdate 

when get more articles, concat onto something in state i.e put a fucntion in serState which spreads the newArticles onto the prevState articles


*/
