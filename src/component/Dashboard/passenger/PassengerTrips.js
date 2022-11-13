import './passenger.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { MdOutlinePersonOutline, MdDelete } from 'react-icons/md'

const cookies = new Cookies()

const PassengerTrip = () => {
  const [post, setPost] = useState([])
  const [deleteTrip, setDeleteTrip] = useState(0)

  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {
    ViewStuff()
  }, [deleteTrip])
  const ViewStuff = () => {
    const user = cookies.get('user')

    const data = {
      request: 'passenger_trips',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_request = response.data
      //alert(trip_request)
      console.log(post)
      setPost(trip_request)
    })
  }
  const DeleteTrip = (e) => {
    const id = e.target.id
    const user = cookies.get('user')
    //alert(id)

    const datas = {
      request: 'delete_trip',
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const delete_trip = response.data
      //alert(delete_trip)
      setDeleteTrip(delete_trip)
    })
  }
  return (
    <div className="my-container">
      {post &&
        post.map((data1, idx) => {
          return (
            <table
              key={idx}
              className="table  table-container1 center port-map mt-4"
            >
              <tr>
                <td className="date-time ">
                  {data1.date}
                  <br />
                  {data1.time}
                </td>
                <td className="departure ">
                  <div className="departure-div">{data1.departure}</div>

                  <div className="point-div">{data1.departure_point}</div>
                </td>
                <td></td>
                <td className="price">&#8358; {data1.trip_price}</td>
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
                  {data1.seats}
                </td>
                <td className="button ">
                  <MdDelete
                    className="center delete-icon"
                    id={data1.my_trip_id}
                    onClick={DeleteTrip}
                    color="red"
                    size={40}
                  />
                  <div className="delete-text">Delete Trip</div>
                </td>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default PassengerTrip
