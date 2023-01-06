# Lay-by - GA Project Three - 7 Days
![Screenshot 2023-01-06 at 12 54 54](https://user-images.githubusercontent.com/114397080/211016475-917aacd6-9745-4e85-8a9c-a953a292f577.png)

![Screenshot 2023-01-06 at 12 55 50](https://user-images.githubusercontent.com/114397080/211016633-5577b1a3-a764-47c8-928f-9da90fd66548.png)

## Description
Lay-by is a website which aims to provide those in the van-owning community with useful insider information about locations for van camping. Public users can use the website to view van spots across a number of countries, and are provided with useful insights into the locations, facilities and ratings. As a registered user of the site you are able to add your own new van camping locations and leave reviews and ratings on all spots. 

## Deployment Link
Lay-by was deployed with Heroku and can be experienced [here](http://bit.ly/lay-by).

## Getting Started/Code Installation
Clone or download the Github repo. Open it in the editor of your choice and run `npm` in your terminal to install all dependencies. 

## Timeframe & Working Team 
I created this website for General Assembly's project three along with my other team members Nick Quirk and Archie Rowan Hamilton. We were given 7 days to build a MERN stack app

## Brief
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
* Be deployed online so it's publicly accessible.

## Features
* All users can search for locations by name and filter search results by countries.
* All users can view locations detailed information about the site, including the average user rating and reviews left by other users. 
* Users can register for an account which allows them to log in 
* Logged in users can create, update and delete locations.
* Logged in users can write, edit and delete their own reviews of the locations.
* Logged in users can view their own profile page,which serves as a dashboard for their reviews. They can add a profile picture to personalise the page. 

## Technologies Used
* MongoDB
* Express
* React.js
* React Router Dom
* Node.js
* JavaScript
* JWT
* Axios
* Buffer
* Bcrypt
* Git + GitHub
* BootStrap
* Mapbox
* Cloudinary
* Insomnia
* VScode
* Npm
* Google Chrome dev tools
* Heroku
* Trello Board, Zoom and Slack
* Excallidraw

## Planning

### Wireframe
We used [Excalidraw](https://excalidraw.com) to sketch out how the website would look and function, to define the user journey, to help us determine the data needed in our schemas and understand the endpoints required for each page. 

#### Desktop
![Screenshot 2023-01-06 at 13 50 51](https://user-images.githubusercontent.com/114397080/211025385-ddfcb50d-5e01-4ef3-987e-c1d543208890.png)

#### Mobile
![Screenshot 2023-01-06 at 13 51 14](https://user-images.githubusercontent.com/114397080/211025548-69154f92-5269-4506-b17e-9149950ef981.png)

### Team organisation
As a group we communicated continually throughout the day during project week, meeting for standups twice daily to examine our progress and prioritise what work needed doing. We used [Trello](https://trello.com/) to manage the work flow and keep track of progress and deadlines. We allocate tasks during our meetings, assign our names to the card and move it between the decks as appropriate. Each meeting we would appraise our progress and work through any problems together, keeping notes on a spreadsheet. Although we individually on the code, each person in the team worked on both the front and back end components and contributed to all the pages and design. 

![Screenshot 2023-01-06 at 13 58 19](https://user-images.githubusercontent.com/114397080/211026786-9bd2ce07-b1af-4271-a720-300a1a9ca046.png)

## Build Process

## App.js 

## Front-end

### Navbar

### Homepage

### Location index page

### Single location page

### Add and edit location pages

### Register and login pages

### Profile page

### Styling
This was achieved with a combination of Bootstrap and Sass.

## Back-end

## Schemas

### Review
Review schema with embedded owner schema.
```javascript
const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, unique: false },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true
  }
)
```

### Location
Location schema with embedded owner and referenced reviews.
```javascript
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  countryCode: { type: String, required: true },
  currency: { type: String, required: true },
  description: { type: String, required: true },
  parking: { type: Boolean, required: true },
  freeparking: { type: Boolean, required: true },
  toilets: { type: Boolean, required: true },
  water: { type: Boolean, required: true },
  nearestFuel: { type: Number, required: true },
  nearbyActivities: { type: String },
  image: [String],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [reviewSchema]
})
```

### Country
Country schema with referenced owner schema and embedded review schema.
```javascript
const countrySchema = new mongoose.Schema({
  country: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  flag: { type: String, required: true },
  locations: [locationSchema],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})
```

### Rating
Rating virtual schema.
```javascript
locationSchema.virtual('avgRating').get(function () {
  if (!this.reviews.length) return 'No Rating'
  const sum = this.reviews.reduce((prev, next) => {
    return prev + next.rating
  }, 0)
  return (sum / this.reviews.length).toFixed(1)
})

locationSchema.set('toJSON', {
  virtuals: true
})
```

### User
 This defines the fields a user will have to complete on registration.
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
})
```

## Routes
Routes were tested using [Insomnia](https://insomnia.rest/). Using Express we created all routes and connected them to their own specific controller functions, routes that require the user to be logged in also needed to go through the secureRoute function.

```javascript
const router = express.Router()

router.route('/locations')
  .get(getAllLocations)
  .post(secureRoute, addLocation)

router.route('/locations/:locationId')
  .get(getSingleLocation)
  .put(secureRoute, updateLocation)
  .delete(secureRoute, deleteLocation)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/locations/:locationId/review')
  .post(secureRoute, addReview)

router.route('/locations/:locationId/review/:reviewId')
  .delete(secureRoute, deleteReview)
  .put(secureRoute, editReview)

router.route('/users/:userId')
  .get(secureRoute, getUser)
  .put(secureRoute, setProfilePic)

router.route('/users')
  .get(getAllUsers)

export default router
```
## Challenges
* It was great havimg such a collaborative approach, but on a couple of occassion small bits of work were duplicated, which could have been avoided. 
* It was sometimes tricky at times working on a task that somepne else had already begun to code. 

## Wins
* This was my first time using GitHub as a team. 
* We all communicated well, merged early and often (and had few merge conflicts).

## Key Learnings/Takeaways
* Naming conventions are very important, and must be meanigful and consistent. 
 
## Bugs

## Future Improvements
* Show the users locations in their profile (already showing their reviews)
* Add in a favorites system and show users favorites in their profile
* A few design changes: larger logo on landing page, larger and bolder font on the location card infographics/text, more info with hover for the infographics.
* Make more of user profile- add bio and add user name with click through to public profile on locations they have added or reviewed. 
