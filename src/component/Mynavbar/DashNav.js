import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { FaBars } from 'react-icons/fa'
import navbarimg from '../../images/travelbro-blue-nav.png'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { useCookies } from 'react-cookie'

import './Mynavbar.scss'
import { Button } from 'react-bootstrap'

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
      <FaBars
        className=" nav-icon border pb-3 pt-3"
        size={40}
        color="white"
        onClick={handleShow}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Travelbro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column flex-grow-1 pe-3">
            <Nav.Link as={Link} to={'/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={'/about '}>
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={'/dashboard '}
              onClick={() => {
                setCookie('page_to_load', 'Driver', { path: '/' })
              }}
            >
              Publish a Ride
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={'/signup '}
              onClick={() => {
                setCookie('page_to_load', 'Driver', { path: '/' })
              }}
            >
              Sign Up
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Dashnavbar
