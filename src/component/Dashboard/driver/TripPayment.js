import './driver.scss'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const baseURL = 'https://www.travelbro.top/api.php'

const TripPayment = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'UserInfo',
    'UserDp',
    'ReferralCode',
  ])

  useEffect(() => {
    Price()
  }, [totalPrice])

  const Price = () => {
    const user = cookies.user
    //alert(user)
    const data = {
      request: 'trips_payment',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trips_payment = response.data
      //alert(trip_request)
      console.log(trips_payment)
      setTotalPrice(trips_payment)
    })
  }

  return (
    <div className="payment-div center border">
      <div className="row border mb-1">
        <div className="col-4">Driver Wallet</div>
        <div className="col-4"></div>
        <div className="col-4">{totalPrice}</div>
      </div>
      <button className="btn btn-primary payment-button">
        Request Payment
      </button>
    </div>
  )
}

export default TripPayment
