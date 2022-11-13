import './Dashboard.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { IoIosPeople } from 'react-icons/io'
import { FaCarSide, FaPowerOff } from 'react-icons/fa'
import Passenger from './passenger/passenger'
import Driver from './driver/driver'
import Signin from './../Register/Signin'
import { useCookies } from 'react-cookie'
import CompleteSignup from './driver/Modal'

const baseURL = 'http://localhost/Travelbro/api.php'
const imageURL = 'http://localhost/Travelbro/'

const Dashboard = () => {
  const [post, setPost] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'UserInfo',
  ])
  const [CurrentPage, setCurrentPage] = useState({
    PageLoad: cookies.page_to_load,
  })

  useEffect(() => {
    let currentState = cookies.page_to_load
    //alert(currentState)
    if (currentState == 'Passenger') {
      setCurrentPage({ PageLoad: Passenger })
    } else if (currentState == 'Driver') {
      setCurrentPage({ PageLoad: Driver })
    } else if (
      currentState == null ||
      currentState == undefined ||
      currentState == ''
    ) {
      setCurrentPage({ PageLoad: Passenger })
    }

    CompleteSign()
    //alert(cookies.status)

    const user = cookies.user
    if (user == '' || user == undefined) {
      window.location.href = '/signin'
    }
  }, [cookies])
  const CompleteSign = () => {
    if (CurrentPage.PageLoad == Driver && cookies.status == 'Passenger') {
      return <CompleteSignup />
    }
  }

  const Present = () => {
    return <CurrentPage.PageLoad />
  }

  const pageLoader = (event) => {
    const Page = event.target.id
    setCookie('page_to_load', Page, { path: '/' })
    //alert(Page)
    if (Page == 'Passenger') {
      setCurrentPage({ PageLoad: Passenger })
    } else if (Page == 'Driver') {
      setCurrentPage({ PageLoad: Driver })
    }
    //setCurrentPage({ PageLoad: Page })
    console.log(CurrentPage.PageLoad)

    //Present(CurrentPage.PageLoad)
  }
  const LogOut = () => {
    window.location.href = '/'
    removeCookie('user', { path: '/' })
  }
  return (
    <div className="my-container1 dashboard-section">
      <div className="flex-container">
        <div className="menu-container border-outline-danger">
          <div className="profile-pic-div center">
            <div className="profile-icon profile-pic icon">
              <img
                src={imageURL + cookies.UserInfo.profile_picture}
                alt={<CgProfile size={90} />}
                className="profile-pic"
              />
            </div>
            <div className="">{cookies.UserInfo.name}</div>
          </div>
          <div className="menu-div">
            <div className="passenger-div" id="Passenger" onClick={pageLoader}>
              <div className="passenger-icon icon">
                <IoIosPeople size={30} />
              </div>
              <div className="passenger-text">Passenger</div>{' '}
            </div>
            <div className="driver-div" id="Driver" onClick={pageLoader}>
              <div className="driver-icon icon">
                <FaCarSide size={30} />
              </div>
              <div className="driver-text">Driver</div>
            </div>
          </div>
          <div className="logout-div" onClick={LogOut}>
            <div className="logout-icon icon">
              <FaPowerOff size={20} />
            </div>
            Log Out
          </div>
        </div>
        <div className="display-container ">
          <CompleteSign />
          <Present />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
