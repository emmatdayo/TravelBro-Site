import './passenger.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { MdOutlinePersonOutline, MdDelete } from 'react-icons/md'
import { BsCreditCardFill } from 'react-icons/bs'
import { usePaystackPayment } from 'react-paystack'

//const cookies = new Cookies()

const SearchTrips = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
  ])
  const imageURL = 'http://www.travelbro.top/'
  const baseURL = 'https://www.travelbro.top/api.php'
  useEffect(() => {
    if (cookies.input) {
      const user = cookies.user
      console.log(cookies.input)
      //alert('done')
      const datas = {
        request: 'search_trip',
        data: cookies.input,
        user: user,
      }

      const new_data = JSON.stringify(datas)
      //const new_data2 = JSON.parse(new_data)

      axios.post(baseURL, new_data).then((response) => {
        const search_data = response.data
        console.log(search_data)
        setPost(search_data)
        //alert(post)
        console.log(post)
      })
    }
  }, [])

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    const user = cookies.user
    //alert('done')
    const datas = {
      request: 'search_trip',
      data: inputs,
      user: user,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const search_data = response.data
      //alert(search_data)
      setPost(search_data)
      //alert(post)
      console.log(post)
      setCookie('input', inputs, { path: '/' })

      //const json_data = JSON.parse(post)
      //alert(json_data.departure)
      // if (!.length) return <div>No data</div>;
    })
  }
  let price = post.trip_price + '00'
  const config = {
    reference: new Date().getTime().toString(),
    email: cookies.user,
    amount: price,
    publicKey: 'pk_test_64126f61df754329ea3017aa6288110785b7cf1d',
    //pk_live_09c77e40e978d48d71865e8a5efd59bd0e089ddb
  }

  // you can call this function anything
  const onSuccess = (reference, e) => {
    // Implementation for whatever you want to do with reference and after success call.
    const id = e.target.id
    const user = cookies.user
    //alert(user)
    const datas = {
      request: 'join_trip',
      data: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const Join_trip = response.data
      alert(Join_trip)
    })
    console.log(reference)
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
  const initializePayment = usePaystackPayment(config)

  const JoinTrip = (e) => {
    initializePayment(onSuccess, onClose)
  }
  return (
    <div className="SearchTrip">
      {' '}
      <form onSubmit={submit_handler}>
        <div className="banner-form2 row">
          <div className="rows col-sm-3">
            <input
              type="text"
              className="text-box"
              name="departure"
              placeholder=" Leaving from..."
              value={inputs.departure}
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
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="text-box pas"
                  name="passengers"
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
              className="btn btn-dark    btn-block"
              value="Search"
              type="submit"
            />
          </div>
        </div>
      </form>
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
                <td>
                  <div className="d-info d-name">{data1.name}</div>
                  <div className="d-info">{data1.tel}</div>
                </td>
                <td className="arrow-icon ">
                  <HiOutlineArrowNarrowDown size={45} />
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr className="">
                <td className="dp">
                  <img
                    className="dp-image"
                    src={imageURL + data1.profile_picture}
                  />
                </td>
                <td className="pb-4 destination ">{data1.destination}</td>
                <td className="seats ">
                  <MdOutlinePersonOutline size={40} />
                  {data1.seats}
                </td>
                <td className="button ">
                  <BsCreditCardFill
                    className="center delete-icon"
                    id={data1.trip_id}
                    onClick={JoinTrip}
                    color="#0695e8"
                    size={45}
                  />
                  <div className="book-trip">Book Trip</div>
                </td>
              </tr>
            </table>
          )
        })}
    </div>
  )
}

export default SearchTrips
