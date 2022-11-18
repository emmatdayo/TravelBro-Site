import './Home.scss'
import bannerimage from '../../images/road3.png'
import publish from '../../images/car-road.jpg'
import title from '../../images/travelbro-blue-title.png'
import about from '../../images/about.png'
import { GiTwoCoins } from 'react-icons/gi'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { BsPersonCheckFill, BsArrowRightShort } from 'react-icons/bs'
import { useState } from 'react'
import Footer from '../Footer/Footer'
import Mynavbar from '../Mynavbar/Mynavbar'
import { useCookies } from 'react-cookie'

const baseURL = 'http://localhost/emart/test.php'

const Home = () => {
  const [inputs, setInputs] = useState({})
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
  ])

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const TopLocation = (e) => {
    const id = e.target.id
    if (id == 'LagosToAbuja') {
      let location = {
        departure: 'Lagos',
        destination: 'Abuja',
        date: '',
        passengers: '1',
      }
      setCookie('input', location, { path: '/' })
    } else if (id == 'LagosToIbadan') {
      let location = {
        departure: 'Lagos',
        destination: 'Ibadan',
        date: '',
        passengers: '1',
      }
      setCookie('input', location, { path: '/' })
    } else if (id == 'AbkToLagos') {
      let location = {
        departure: 'Abeokuta',
        destination: 'Lagos',
        date: '',
        passengers: '1',
      }
      setCookie('input', location, { path: '/' })
    }

    console.log(cookies.input)
    setCookie('page_to_load', 'Passenger', { path: '/' })

    window.location.href = '/dashboard'
  }

  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    setCookie('input', inputs, { path: '/' })

    window.location.href = '/dashboard'
  }

  return (
    <>
      <Mynavbar />
      <div className="my-container ">
        <div className="row my-banner  pt-2 pb-5 ">
          <div className="col-sm-5 p-2">
            <div className="form-container">
              <div className="banner-title mb-5">
                <div className="title-image">
                  <img src={title} className="image1" alt="Travelbro" />
                </div>

                <div className="sub-title ">
                  Let's help you get to where you want to go at a low price
                </div>
                <button
                  className="banner-button btn btn-primary mt-3"
                  onClick={() => {
                    window.location.href = '/dashboard'
                    setCookie('page_to_load', 'Driver', { path: '/' })
                  }}
                >
                  Publish a Ride
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-7">
            <img src={bannerimage} className="image" />
          </div>
        </div>

        <form onSubmit={submit_handler}>
          <div className="banner-form row">
            <div className="rows col-sm-3">
              <input
                type="text"
                className="text-box"
                name="departure"
                placeholder=" Leaving from..."
                value={inputs.location}
                onChange={change_handler}
                required
              />
            </div>
            <div className="rows col-sm-3">
              <input
                type="text"
                className="text-box"
                name="destination"
                placeholder=" Going to..."
                value={inputs.destination}
                onChange={change_handler}
                required
              />
            </div>

            <div className="col-sm-3 mb-2">
              <div className="row">
                <div className="col-8">
                  <input
                    type="date"
                    className="text-box"
                    name="date"
                    placeholder="Date"
                    value={inputs.date}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="col-4">
                  <input
                    type="number"
                    className="text-box pas"
                    name="seats"
                    placeholder="1"
                    value={inputs.passengers}
                    onChange={change_handler}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="button mt-2 col-sm-3">
              <input
                className="btn btn-primary  btn-block"
                value="Search"
                type="submit"
              />
            </div>
          </div>
        </form>
        <div className="info-section">
          <div className="row container center">
            <div className="col-sm-4">
              <div className="info-icon">
                <GiTwoCoins size={60} color="#c5d3fd" />
              </div>
              <div className="info-title">Your pick of rides at low prices</div>
              <div className="info-text">
                No matter where you’re going, by bus or carpool, find the
                perfect ride from our wide range of destinations and routes at
                low prices.
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className="info-icon">
                <BsPersonCheckFill size={50} color="#c5d3fd" />
              </div>
              <div className="info-title">Trust who you travel with</div>
              <div className="info-text">
                We take the time to get to know each of our members and bus
                partners. We check reviews, profiles and IDs, so you know who
                you’re travelling with and can book your ride at ease on our
                secure platform.
              </div>
            </div>
            <div className="col-sm-4">
              <div className="info-icon">
                <BsFillLightningChargeFill size={45} color="#c5d3fd" />
              </div>
              <div className="info-title">Scroll, click, tap and go!</div>
              <div className="info-text ">
                Booking a ride has never been easier! Thanks to our simple app
                powered by great technology, you can book a ride close to you in
                just minutes.
              </div>
            </div>
          </div>
        </div>

        <div className="top-destination pt-4 pb-5">
          <div className="destination-text">Where do you want a ride to?</div>
          <div className="row container destination-container center mt-3">
            <div className="col-sm-4 mb-2 ">
              <div className="destination row ">
                <div
                  id="LagosToAbuja"
                  onClick={TopLocation}
                  className="location col-10 "
                >
                  Lagos <BsArrowRightShort size={25} /> Abuja
                </div>
                <div className="pointer col-2 ">&gt;</div>
              </div>
            </div>
            <div className="col-sm-4 mb-2 ">
              <div className="destination row">
                <div
                  id="LagosToIbadan"
                  onClick={TopLocation}
                  className="location col-10"
                >
                  Lagos <BsArrowRightShort size={25} /> Ibadon
                </div>
                <div className="pointer col-2">&gt;</div>
              </div>
            </div>
            <div className="col-sm-4 mb-2 ">
              <div className="destination row">
                <div
                  id="AbkToLagos"
                  onClick={TopLocation}
                  className="location col-10 "
                >
                  Lagos <BsArrowRightShort size={25} /> Abeokuta
                </div>
                <div className="pointer col-2 ">&gt;</div>
              </div>
            </div>
          </div>
        </div>

        <div className="publish-section">
          <div className="row container center mt-3 mb-3">
            <div className="col-sm-6 img-container">
              <div className="img-div center">
                <img src={publish} className="publish-img" />
              </div>
            </div>
            <div className="col-sm-6 text-container">
              <div className="publish-textarea center">
                <div className="publish-title mb-2">
                  Where do you want to drive to?
                </div>
                <div className="publish-text mb-3">
                  Let's make this your least expensive journey ever.
                </div>
                <button
                  className="button btn btn-lg btn-primary"
                  onClick={() => {
                    setCookie('page_to_load', 'Driver', { path: '/' })

                    window.location.href = '/dashboard'
                  }}
                >
                  Publish a ride
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <div className="row container pb-3 center">
            <div className="col-sm-6 text-container">
              <div className="about-textarea center">
                <div className="about-title mb-2">Learn more about us</div>
                <div className="about-text mb-3">
                  At Travelbro, our objective is to make the Whole experience
                  easier, fun and secure. Let's take you through how it works
                  and prevent you from scams
                </div>
                <button
                  className="button btn btn-lg btn-primary"
                  onClick={() => {
                    window.location.href = '/about'
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>

            <div className="col-sm-6 img-container">
              <div className="img-div center">
                <img src={about} className="about-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="metrics pb-5 border"></div>
        <Footer />
      </div>
    </>
  )
}

export default Home
