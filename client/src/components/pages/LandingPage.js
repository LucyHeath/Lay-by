/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import axios from 'axios'
import van from '../images/van.jpeg'
import login from '../images/login.jpg'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Infographic from '../common/Infographic'
import CarouselImageController from '../common/CarouselImage'
import CarouselCardController from '../common/CarouselCard'
const LandingPage = () => {
  const navigate = useNavigate()

  const [locations, setLocations] = useState([])
  let [shuffled, setShuffled] = useState([])
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations')
        setLocations(data)
      } catch (err) {
        console.log(err.message)
        setErrors(true)
      }
    }
    getData()
  }, [])

  const navigateToLogin = () => {
    navigate('/login')
  }

  const navigateToRegister = () => {
    navigate('/register')
  }

  const navigateToLocationIndex = () => {
    navigate('/locations')
  }

  useEffect(() => {
    const getRandomLocations = () => {
      const shuffler = locations.sort((a, b) => 0.5 - Math.random())
      setShuffled(shuffler)
    }
    getRandomLocations()
  }, [locations])

  return (
    <main className="landing-page">
      <Container fluid className="char-container">
        <Row>
          <div
            className="col-xs-1 text-center "
            id="hero"
            style={{ backgroundImage: `url(${van})` }}
          >
            <Button
              id="hero-btn"
              className="btn btn-danger btn-lg"
              onClick={() => navigateToLocationIndex()}
            >
              Start Exploring Locations
            </Button>
          </div>
        </Row>
        <div className="display-top-rated text-center">
          <h2 id="hero-text">Plan Your Next Adventure</h2>
        </div>
        <CarouselCardController shuffled={shuffled} locations={locations} />
        <Row>
          <div id="login-register" style={{ backgroundImage: `url(${login})` }}>
            <h2 id="post-text" className=" text-center text-white">
              Review and Post Spots
            </h2>
            <div
              id="login-register-buttons"
              className="col border-end d-flex justify-content-center align-items-center"
            >
              <Button
                type="button"
                className="btn btn-danger btn-lg mt-3 mb-3"
                onClick={() => navigateToLogin()}
              >
                Login
              </Button>
              <Button
                type="button"
                className="btn btn-danger btn-lg mt-3 mb-3"
                onClick={() => navigateToRegister()}
              >
                Register
              </Button>
            </div>
          </div>
        </Row>
        <Row id="tickertape">
          <div className="ticker-tape-div text-center mt-3">
            <div data-mc-src="359dbd97-d501-4e1d-8a2f-8e00870bd464#instagram"></div>
          </div>
        </Row>
      </Container >
    </main >
  )
}

export default LandingPage
