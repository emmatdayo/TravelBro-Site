import Signup from '../../Register/Signup'
import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CompleteSignup = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState('')
  const [cookies, setCookie] = useCookies(['user', 'status'])

  const baseURL = 'https://www.travelbro.top/api.php'

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    const user = cookies.user
    //console.log(cookies.user)
    //console.log(cookies.status)
    const datas = {
      request: 'complete_signup',
      data: inputs,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const res = response.data.status

      setPost(res)
      if (res == 'driver') {
        setCookie('user', inputs.email, { path: '/' })
        setCookie('status', 'driver', { path: '/' })
        console.log(res)
        console.log(cookies.status)
      }
    })
  }

  return (
    <div className="modal-container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 center form-container2">
          <h4>Fill to be a Driver</h4>
          <form onSubmit={submit_handler}>
            <div className="modal-div p-4  center">
              <div className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  name="idcard-type"
                  onChange={change_handler}
                  required
                >
                  <option>Id-Card Type</option>
                  <option value="NIN">National ID-Card</option>
                  <option value="international_passport">
                    International Passport
                  </option>
                  <option value="drivers_lincense">Drivers Lincense</option>
                </Form.Select>
              </div>
              <div className="row half-div center">
                <div className="form-group col-6 idcard-number-div center mb-4">
                  <input
                    type="text"
                    className="idcard-number-input input"
                    name="idcard-number"
                    placeholder=" Id-Card Number"
                    value={inputs.idcard_number}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="form-group col-6 drivers-lincense-div center mb-4">
                  <input
                    type="text"
                    className=" drivers-lincense-input input"
                    name="drivers-lincense-number"
                    placeholder=" Drivers Lincense Number"
                    value={inputs.drivers_lincense_number}
                    onChange={change_handler}
                    required
                  />
                </div>
              </div>
              <div className="form-group address-div center mb-4">
                <textarea
                  className=" address-input"
                  name="address"
                  placeholder=" Address"
                  value={inputs.address}
                  onChange={change_handler}
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="button-div center mb-2 mt-4">
                <input type="submit" className="btn button " value="Submit" />
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  )
}
export default CompleteSignup
