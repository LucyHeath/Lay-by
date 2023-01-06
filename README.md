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

## Build Process

As a group we communicated continually throughout the day during project week, meeting for standups twice daily to examine our progress and prioritise what work needed doing. We used [Trello](https://trello.com/) to manage the work flow and keep track of progress and deadlines. We allocate tasks during our meetings, assign our names to the card and move it between the decks as appropriate. Each meeting we would appraise our progress and work through any problems together, keeping notes on a spreadsheet. Although we all coded individually, we broke work up into components, rather than pages, so we all got the chance to work across the stack on different comploennts.

![Screenshot 2023-01-06 at 13 58 19](https://user-images.githubusercontent.com/114397080/211026786-9bd2ce07-b1af-4271-a720-300a1a9ca046.png)

## Front-end

### App.js 
```javscript
const App = () => {

  return (
    <div className='sitewrapper'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/locations' element={<LocationMultiPage />} />
          <Route path='/locations/:locationId' element={<LocationSinglePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/locations/add' element={<AddLocation />} />
          <Route path='/locations/:locationId/edit' element={<EditLocation />} />
          <Route path='/profile/:userId' element={<UserProfilePage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  )
}
```
### Navbar

The Navbar is responsive and becomes a burger and collapsable menu on smaller screens, and the options change depending on user authentication. 

![Logged in Navbar](https://user-images.githubusercontent.com/114397080/211049250-9a2cca76-602d-4bff-96ff-747333ca668c.png)
![Logged out Navbar](https://user-images.githubusercontent.com/114397080/211056888-bd2f673d-b8ba-47b8-b9cc-3b1bfd1fa0a0.png)
![Burger Navbar on smaller screens](https://user-images.githubusercontent.com/114397080/211057168-ae184a67-0ef3-45bb-b21d-ae21aeb12cd4.png)

#### `isAuthenticated` helper in `Auth.js`
```javascript
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const { exp } = payload
  const now = Math.round(Date.now() / 1000)
  return exp > now
}
```
#### `getPayload` helper in `Auth.js`
```javascript
export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return false
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}
```

### Homepage

### Location index page
This page is built using a card component(Bootstrap)

![Index page](https://user-images.githubusercontent.com/114397080/211047556-e93bd77e-ff39-4cec-8e47-876923059baf.png)

#### Filter and search bar
This works well and can be used in combination if the user would like to filter a spot by country of directly search for the location by name.

![Filter](https://user-images.githubusercontent.com/114397080/211046650-e3a2077c-1ff4-45b9-98c3-0ba465581bf3.png)

![Search](https://user-images.githubusercontent.com/114397080/211046866-0b2a64a3-d70a-4d95-b886-5d57dfb49120.png)

```javascript
const FilterSearch = ({ locations, setFilteredLocations }) => {
  const [input, setInput] = useState({
    search: '',
    countryCode: 'All'
  })
  useEffect(() => {
    const regex = new RegExp(input.search, 'i')
    const filteredArr = locations.filter((loc) => {
      return (
        regex.test(loc.name) &&
        (loc.countryCode === input.countryCode || input.countryCode === 'All')
      )
    })
    setFilteredLocations(filteredArr)
  }, [input, locations, setFilteredLocations])

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
```

#### Loading spinner
Heroku can take some time to load, therefore the use of a spinner keeps the user engaged whilst the page is loading. 

### Single location page

This page displays the data from an individual location endpoint. 

![Single location page with map tab](https://user-images.githubusercontent.com/114397080/211049132-40f03252-6661-4bd9-8f9b-ab47067233b0.png)

![Review tab on single location page](https://user-images.githubusercontent.com/114397080/211049943-f5a08202-c911-4db6-8305-23a8bd7cf0c1.png)

Data is brought into the `LocationSinglePage.js` using the single location endpoint within a `useEffect`. 

```javascript
  const [location, setLocation] = useState(null)
  const { locationId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { data } = await axios.get(`/api/locations/${locationId}`)
        setLocation(data)
      } catch (err) {
        console.log(err)
      }
    }
    getLocation()
  }, [locationId])
```

* **Average user rating** is calculated from the user reviews. 
* **`CarouselImage.js`** component shows the location images (served by Cloudinary) and the movement and variety of images provides interest to the page. 
* **`InforgraphicSingle.js`** component displays the site key data. It would have benefitted from use of tooltips and the font being slightly larger.
* **Mapbox** injects a pictoral representation of the location, and the user can zoon in/out and view the lat and long.
* **Tabs** toggle between the review and mapkeep the page design clean and minimal. 
* **"Edit Location"** and **"Delete Location"** buttons display if the user is the location owner. A modal to prevent accidental deletion would have been useful here. 

![Edit and delete locations](https://user-images.githubusercontent.com/114397080/211051728-8a67ffbc-58ab-46e9-99c0-27195f6b7521.png)

#### Delete location controller, JSX return and `isOwner` helper (`Auth.js`)

```javascript
const deleteLocation = async (e) => {
    try {
      const response = await axios.delete(`/api/locations/${locationId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/')
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
```
```javascript
{isOwner(location.owner) &&
                      <div className='edit-delete-buttons d-flex justify-content-evenly'>
                        <button onClick={deleteLocation} className='btn btn-danger btn-lg mt-3 mb-3 ' id='del-btn'>Delete Location</button>
                        <Link to={`/locations/${locationId}/edit`}>
                          <button className='btn  btn-warning btn-lg mt-3 mb-3' id='edit-btn'>Edit Location</button>
                        </Link>
                      </div>
                    }
```
```javascript
export const isOwner = (token1) => {
  const payload = getPayload()
  if (!payload) return false
  return token1 === payload.sub
}

```

### Add and edit location pages
The form is used to edit a location that the user has added. The form fields are populated with the location data with the GET request, and data is sent to the API wihtthe PUT request. The request must check the user is authenticated to make the request. Once complete the user is navigated to their newly updated location. Note `LocationForm.js` is a reuseable component brought in to both the add and edit pages.

![Screenshot 2023-01-06 at 17 32 00](https://user-images.githubusercontent.com/114397080/211065951-82b426a5-b688-4bd9-8f7e-19a6722c0929.png)

```javascript
const EditLocation = () => {

  const { locationId } = useParams()
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [formFields, setFormFields] = useState({
    name: '',
    latitude: undefined,
    longitude: undefined,
    countryCode: '',
    currency: '',
    description: '',
    parking: true,
    freeParking: false,
    toilets: false,
    water: false,
    nearestFuel: undefined,
    nearbyActivities: '',
    image: ''
  })

  useEffect(() => {
    const getSingleLocation = async () => {
      try {
        const { data } = await axios.get(`/api/locations/${locationId}`)
        //populate for fields with single location info
        setFormFields(data)
      } catch (err) {
        console.log(err)
      }
    }
    getSingleLocation()
  }, [locationId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/locations/${locationId}`, formFields,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
      console.log('Location edited ->', data)
      navigate(`/locations/${locationId}`)
    } catch (err) {
      console.log('Edit failed ->', err)
      setErrors(err.response.data)
    }
  }

  // ! JSX
  return (
    <div className="site-wrapper">
      <div className="hero-page text-center form-main">
        <h1 className="mt-5">Edit a Location</h1>
        <LocationForm
          handleSubmit={handleSubmit}
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          formName="Edit Location"
        />
      </div>
    </div>
    
  )
}

export default EditLocation
```
The `LocationForm.js` contains general and field specific error handling.

```javascript
         <input
            className="form-control mt-3 mb-3"
            type="text"
            name="nearbyActivities"
            id="nearbyActivities"
            onChange={handleChange}
            placeholder="Nearby activities e.g. Hiking, swimming..."
            value={formFields.nearbyActivities}
          />
          {errors && errors.nearbyActivities && <small className='text-danger'>{errors.nearbyActivities}</small>}
          <UploadImage 
            imageFormData={formFields}
            setFormData={setFormFields}
          />
          {errors && errors.image && <small className='text-danger'>{errors.image}</small>}
          {/* Generic Message Error */}
          {errors && errors.message && <small className='text-danger'>{errors.message}</small>}
          {/* <Button type="button" className="btn  btn-lg mt-5 mb-4" onClick={() => handleSubmit()}>Submit</Button> */}
```

### Register and login pages

### Profile page

### Styling
This was achieved with a combination of Bootstrap and Sass. I styled the forms and we worked collaboratively on the visual design through the rest of the pages and components. We standardised features like the colour palette, buttons etc. 

## Back-end

Whilst the back end was a joint effort, I primarily took ownership of the CRUD functionality for the locations, and heavily contributed to the login and register controllers, back end authentication and the schemas.

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

## Controllers

### Location index route 
* **GET** '/api/locations'

```javascript
export const getAllLocations = async (req, res) => {
  try {
    const location = await findAllLocations(req, res)
    return res.json(location)
  } catch (err) {
    console.log(err)
    errorHandler(res, err)
  }
}
```
`getAllLocations` uses this `findAllLocations` function in `helper.js` to find the location objects nested inside each region (country) 

```javascript
export const findAllLocations = async (req, _res) => {
  try {
    const locations = await VanSpot.find()
    for (const location of locations) {
      await location.populate('locations.reviews.owner')
    }
    const filteredLocations = locations.map(loc => {
      return loc.locations
    })
    const concatFilteredLocations = filteredLocations.flat()
    return concatFilteredLocations
  } catch (err) {
    console.log(err)
  }
}
```

### Location single route 
* **GET** '/api/locations/:locationId'

```javascript
export const getSingleLocation = async (req, res) => {
  try {
    const location = await findLocation(req, res)
    return res.json(location)
  } catch (err) {
    console.log(err)
    errorHandler(res, err)
  }
}
```
The `getSingleLocation`controller uses the helper `findLocation` ( `helper.js`) to find to filter the location objects and find the single location. 

```javascript
export const findLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const location = await findAllLocations(req, res)
    const targetLocation = location.filter(loc => {
      return locationId === loc.id
    })
    const [newTargetLocation] = targetLocation
    return newTargetLocation
  } catch (err) {
    console.log(err)
  }
}
```
### Add new location
* **POST** 'api/createLocation'

```javascript
export const addLocation = async (req, res) => {
  try {
    const { countryCode } = req.body
    const country = await VanSpot.find()
    const targetCountry = country.filter(country => {
      return country.countryCode === countryCode
    })
    if (!targetCountry) {
      throw new Error('This location does not have a valid country')
    }
    const [newTargetCountry] = targetCountry
    if (newTargetCountry) {
      const newLocation = { ...req.body, owner: req.currentUser.id }
      newTargetCountry.locations.push(newLocation)
      await newTargetCountry.save()
      return res.status(201).json(targetCountry)
    }
  } catch (err) {
    console.log(err)
    errorHandler(res, err)
  }
}
```

### Edit a location
* **PUT** 'api/:locationId/editLocation'

```javascript
export const updateLocation = async (req, res) => {
  try {
    const targetLocation = await findLocation(req, res)
    if (targetLocation && req.currentUser._id.equals(targetLocation.owner)) {
      Object.assign(targetLocation, req.body)
      const parent = await targetLocation.parent()
      await parent.save()
      return res.status(202).json(targetLocation)
    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    console.log(err)
    errorHandler(err)
  }
}
```

### Delete a location
* **PUT** 'api/:locationId/deleteLocation'

```javascript
export const deleteLocation = async (req, res) => {
  try {
    const targetLocation = await findLocation(req, res)
    if (targetLocation && req.currentUser._id.equals(targetLocation.owner)) {
      targetLocation.remove()
      const parent = await targetLocation.parent()
      await parent.save()
      return res.sendStatus(204)
    } else {
      throw new Unauthorised()
    }
  } catch (err) {
    console.log(err)
    errorHandler(err)
  }
}
```

### Register
* **POST** 'api/register'

```javascript
export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: err.message })
  }
}
```

### Login
* **POST** 'api/login'

```javascript
export const loginUser = async (req, res) => {
  try {
    // destructure email and password keys from req.body
    const { email, password } = req.body
    // check email on the req.body against the collection to see if there's a matching document
    const userToLogin = await User.findOne({ email: email })
    // check to see if user has been found & password match
    // passing password entered to the custom function we created in user schema
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      throw new Unauthorised()
    }
    // if they match, create an object with user id and the username and send token back to user
    const payload = {
      sub: userToLogin._id,
      username: userToLogin.username
    }
    // set secret = to secret in .env file
    const secret = process.env.SECRET
    // create token from payload and the secret
    const token = jwt.sign(payload, secret, { expiresIn: '7 days' })
    // return welcome message and token to user
    return res.json({
      message: `Welcome back ${userToLogin.username}`,
      token: token
    })
  } catch (err) {
    console.log(err)
  }
```

## Challenges
* It was great havimg such a collaborative approach, but on a couple of occassion small bits of work were duplicated. As this was a learniing opportunity it wasn't too problematic. 
* It could be challenging building on some one elses code, or navigating around unfamiliar components.
* The naming conventions are all over the place. As changes were made,due to time limitations, some variables and funcitons were not renamed, this lead to some confuciotn at points, espiecially when the group chose to change the topic a day in to the coding process. 
* Parts of the code is heavily annotated which helps in undertanding it, but makes it very hard to read. It could be much more DRY.The Sass unessarily lengthy and there are duplications due to 3 people working on it in the final sprint! 
* Although it was important to have a good end product, my primary aim was to learn as much as possible, and do the basics well. It was great to learn from other group members who had more coding experience but sometimes there was a risk of overstretching on the deliverables, and not achieving the MVP.

## Wins
* This was my first time using GitHub as a team and it worked very well because we merged early and often (and had few merge conflicts).
* I found working as a team was a great way of cementing my own skills, as well as learing new ones. Having a team that could act as a sounding board and support with problemsolving felt very supportive. 
* I utilised my soft skills with regards to team working, communication and organisation. I facilitated the daily standups and progress checking. 

## Key Learning
* Naming conventions are very important, and must be meanigful and consistent. Take time to make changes if necessary.
 
## Bugs

## Future Improvements
* Refactoring parts of the code, especially the Sass. There could be further break down into component parts.
* Show the locations created by an individual user in their own profile (already show their reviews)
* Adding in geolocation from Mapbox, rather than having to input the lat and long for the add location, would make a better user experience.
* Add in a favorites system and show users favorites in their profile
* A few design changes: larger logo on landing page, larger and bolder font on the location card infographics/text, more info with hover for the infographics.
* Make more of user profile- add bio and add user name with click through to public profile on locations they have added or reviewed. 
* Add in modals when the user clicks on "Delete" anywhere on the site, to prevent accidental deletion. 
