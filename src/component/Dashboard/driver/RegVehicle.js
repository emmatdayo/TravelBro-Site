import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const RegVehicle = () => {
  const [inputs, setInputs] = useState('')
  const [file, setFile] = useState('')
  const [cookies, setCookie] = useCookies(['user', 'status'])

  const baseURL = 'https://www.travelbro.top/UploadApi.php'

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const file_handler = (e) => {
    const fileImg = e.target.files[0]
    setFile(fileImg)
  }

  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    //alert('done')
    const formData = new FormData()

    const user = cookies.user
    formData.append('user', user)
    formData.append('reg_vehicle', user)

    formData.append('image', file, file.name)

    for (var key in inputs) {
      formData.append(key, inputs[key])
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    axios.post(baseURL, formData).then((response1) => {
      console.log(response1.data)
      alert('Vehicle Registered')
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
                <div className="form-input center">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Vehicle picture</Form.Label>
                    <Form.Control
                      name="vehicle-picture"
                      type="file"
                      value={inputs.vehicle_picture}
                      onChange={file_handler}
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                  </Form.Group>
                </div>

                <div className="form-group vn-input-div center mb-4">
                  <input
                    type="text"
                    className=" vehicle-name-input input"
                    name="vehicle-name"
                    placeholder=" Vehicle Name"
                    value={inputs.vehicle_name}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="row half-div center">
                  <div className="form-group col-6 vc-input-div center mb-4">
                    <input
                      type="text"
                      className=" vehicle-colour-input input"
                      name="vehicle-colour"
                      placeholder=" Vehicle Colour"
                      value={inputs.vehicle_colour}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 seats-input-div center mb-4">
                    <input
                      type="number"
                      className=" seats-input input"
                      name="capacity"
                      placeholder=" Capacity"
                      value={inputs.capacity}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>
                <div className="row half-div center">
                  <div className="form-group col-6 plate-number-input-div center mb-4">
                    <input
                      type="text"
                      className=" plate-number-input input"
                      name="plate-number"
                      placeholder=" Plate Number"
                      value={inputs.plate_number}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 vehicle-lincense-number-input-div center mb-4">
                    <input
                      type="vehicle-lincense-number"
                      className=" vehicle-lincense-number-input input"
                      name="vehicle-lincense-number"
                      placeholder=" Vehicle Lincense Number "
                      value={inputs.vehicle_lincense_number}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>

                <div className="button-div center mb-4">
                  <input
                    type="submit"
                    className="btn button "
                    value="Register Vehicle"
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

export default RegVehicle
