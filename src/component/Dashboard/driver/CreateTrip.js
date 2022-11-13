import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const CreateTrip = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState('')
  const [vehicle, SetVehicle] = useState([])

  const baseURL = 'http://localhost/Travelbro/api.php'

  useEffect(() => {
    ViewVehicle()
  }, [])

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const ViewVehicle = () => {
    const user = cookies.get('user')
    const datas = {
      request: 'registered_vehicle',
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      //alert(response.data)
      SetVehicle(response.data)
      console.log(vehicle)
      // alert(vehicle)
      //alert(JSON.parse(new_data))
    })
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    //alert('done')
    const user = cookies.get('user')
    const datas = {
      request: 'create_trip',
      data: inputs,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      setPost(response.data)
      alert(response.data)
      //alert(response.data)
      //alert(JSON.parse(new_data))
    })
  }
  return (
    <div className="">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-7 center s-container">
          <div className="signup-container center ">
            <form onSubmit={submit_handler}>
              <div className="create-container p-4  center">
                <div className="row half-div center">
                  <div className="form-group col-6 dp-input-div center mb-4">
                    <input
                      type="text"
                      className=" departure-input input"
                      name="departure"
                      placeholder=" Departure"
                      value={inputs.departure}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 destination-input-div center mb-4">
                    <input
                      type="text"
                      className=" destination-input input"
                      name="destination"
                      placeholder=" Destination"
                      value={inputs.tel}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>
                <div className="row half-div center">
                  <div className="form-group col-6 date-input-div center mb-4">
                    <input
                      type="date"
                      className=" date-input input"
                      name="date"
                      placeholder=" Date"
                      value={inputs.date}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 time-input-div center mb-4">
                    <input
                      type="time"
                      className=" time-input input"
                      name="time"
                      placeholder=" Time"
                      value={inputs.time}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>

                <div className="row half-div center">
                  <div className="form-group col-6 vc-input-div center mb-4">
                    <input
                      type="text"
                      className=" vehicle-colour-input input"
                      name="trip_price"
                      placeholder=" Trip Price"
                      value={inputs.price}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 seats-input-div center mb-4">
                    <input
                      type="number"
                      className=" seats-input input"
                      name="trip_seats"
                      placeholder=" Seats"
                      value={inputs.seats}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>

                <div className="form-group departure-point-input-div center mb-4">
                  <input
                    type="departure-point"
                    className=" departure-point-input input"
                    name="departure-point"
                    placeholder=" Departure Point"
                    value={inputs.departure_point}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div>
                  <Form.Select
                    aria-label="Default select example"
                    name="vehicle_id"
                    value={inputs.vehicle_id}
                    onChange={change_handler}
                    required
                  >
                    <option>Choose Vehicle</option>
                    {vehicle &&
                      vehicle.map((data1, idx) => {
                        return (
                          <option key={idx} value={data1.vehicle_id}>
                            {data1.vehicle_name}
                          </option>
                        )
                      })}
                  </Form.Select>
                </div>
                <div className="button-div center mb-4 mt-4">
                  <input
                    type="submit"
                    className="btn button "
                    value="Create Trip"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  )
}

export default CreateTrip
