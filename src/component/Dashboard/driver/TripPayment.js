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
  return (
    <div className="payment-div">
      <div className="row">
        <div className="col-8">Driver Wallet</div>
        <div className="col-4">{totalPrice}</div>
      </div>
      <button className="btn btn-success">Request Payment</button>
    </div>
  )
}

export default TripPayment
