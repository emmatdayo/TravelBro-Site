import './driver.scss'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { MdOutlinePersonOutline, MdDelete, MdCancel } from 'react-icons/md'
import { GiCheckMark } from 'react-icons/gi'

const cookies = new Cookies()

const TripRequest = () => {
  const [post, setPost] = useState([])

  const baseURL = 'https://www.travelbro.top/api.php'
  useEffect(() => {
    ViewStuff()
  })
  const ViewStuff = () => {
    const user = cookies.get('user')

    const data = {
      request: 'trip_request',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const driver_trips = response.data
      //alert(trip_request)
      //console.log(driver_trips)
      setPost(driver_trips)
    })
  }
  const UpdateStatus = (e) => {
    const TargetId = e.currentTarget.id
    const IdArray = TargetId.split(' ')
    const id = IdArray[0]
    const value = IdArray[1]

    const user = cookies.get('user')
    //alert(id)
    //alert(value)
    const datas = {
      request: 'update_status',
      id: id,
      value: value,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const update_status = response.data
      console.log(update_status)
    })
  }
  return (
    <div className="my-container">
      {post &&
        post.map((data1, idx) => {
          return (
            <table
              key={idx}
              className="table table-container1 center port-map mt-4"
            >
              <tr>
                <td className="date-time ">
                  {data1.date}
                  <br />
                  {data1.time}
                </td>
                <td className="departure">
                  <div className="departure-div">{data1.departure}</div>

                  <div className="point-div">{data1.departure_point}</div>
                </td>
                <td className="price">&#8358; {data1.trip_price}</td>
                <td className="passanger-icon">
                  <div className="mb-1">
                    <GiCheckMark
                      className="passenger-list-icon center"
                      id={data1.my_trip_id + ' ' + 'accepted'}
                      onClick={UpdateStatus}
                      color="black"
                      size={25}
                    />
                    <div className="passenger-text">Accept</div>
                  </div>
                </td>{' '}
              </tr>

              <tr className="middle-row">
                <td></td>
                <td className="arrow-icon ">
                  <HiOutlineArrowNarrowDown size={45} />
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td className="dp ">dp</td>
                <td className="pb-4 destination ">{data1.destination}</td>
                <td className="seats ">
                  <MdOutlinePersonOutline size={40} />
                  {data1.trip_seats}
                </td>
                <td className="button ">
                  <MdCancel
                    className="center delete-icon"
                    id={data1.my_trip_id + ' ' + 'rejected'}
                    onClick={UpdateStatus}
                    color="black"
                    size={40}
                  />
                  <div className="reject-text">Reject</div>
                </td>
              </tr>
              <tr>
                <td colSpan="5"></td>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default TripRequest
