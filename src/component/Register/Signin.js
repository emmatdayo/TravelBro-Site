import './Register.scss'
import logo from '../../images/travelbro-blue-nav.png'
//import { TiSocialFacebook } from 'react-icons/ti'
import { BsArrowRightShort, BsFacebook } from 'react-icons/bs'
import { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Signup = () => {
  const [inputs, setInputs] = useState({})
  const [post, setPost] = useState({})
  const [cookies, setCookie] = useCookies(['user'])

  const [fbinfo, setFbinfo] = useState({
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
  })

  const baseURL = 'http://localhost/Travelbro/api.php'

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)

    const datas = {
      request: 'signin',
      data: inputs,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      setPost(response.data)
      console.log(response.data)
      //alert(post)
      const status = response.data.status
      const UserInfo = response.data.user_info[0]
      const type = response.data.user_info[0].user_status
      console.log(status)
      console.log(type)
      console.log(UserInfo)
      if (status == 'logged_in') {
        window.location.href = '/dashboard'
        setCookie('user', inputs.email, { path: '/' })
        setCookie('page_to_load', type, { path: '/' })
        setCookie('status', type, { path: '/' })
        setCookie('UserInfo', UserInfo, { path: '/' })

        //alert(cookies.user)
      } else {
        // alert('not yet')
      }
      //alert(JSON.parse(new_data))
    })

    if (post == 'true') {
      alert('redirect to dashboard')
    }
  }

  const responseFacebook = (response) => {
    //console.log(response)

    setFbinfo({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    })
  }

  const componentClicked = () => {
    console.log('clicked')
  }
  let fbcontent

  if (fbinfo.isLoggedIn) {
    fbcontent = (
      <div
        style={{
          width: '400px',
          margin: 'auto',
          background: '#f4f4f4',
          padding: '20px',
        }}
      >
        <img src={fbinfo.picture} alt={fbinfo.name} />
        <h2>Welcome {fbinfo.name}</h2>
        Email: {fbinfo.email}
      </div>
    )
  } else {
    fbcontent = (
      <FacebookLogin
        appId="1480647395772893"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    )
  }
  return (
    <div className="my-container">
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 s-container">
          <div className="signin-container  ">
            <div className="logo-container center ">
              <img src={logo} alt="Travelbro" className="logo-img" />
            </div>

            <div className="header-container">
              <h1 className="signup-title">Sign into Travelbro</h1>
            </div>

            <div className="form-container ">
              <form onSubmit={submit_handler}>
                <div className="form-group email-input-div center mb-4">
                  <input
                    type="email"
                    className=" email-input"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder=" Enter email"
                    value={inputs.email}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div class="form-group pass-input-div center mb-5">
                  <input
                    type="password"
                    className=" pass-input"
                    name="password"
                    placeholder=" Password"
                    value={inputs.password}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="button-div center mb-4">
                  <input type="submit" className="btn button " value="Submit" />
                </div>
              </form>
              <button className="btn button2">
                Continue with Facebook <BsFacebook size={20} color="white" />
              </button>

              <div className="signin-link center">
                Already a member{' '}
                <span className="link text-primary">Sign in</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </div>
  )
}

export default Signup
