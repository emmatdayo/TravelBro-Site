import React from 'react'
import Container from 'react-bootstrap/Container'

import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import navbarimg from '../../images/travelbro-blue-nav.png'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useCookies } from 'react-cookie'

import './Mynavbar.scss'

const Dashnavbar = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [cookies, setCookie, removeCookie] = useCookies([
    'user',
    'status',
    'page_to_load',
    'input',
  ])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Dashnavbar
