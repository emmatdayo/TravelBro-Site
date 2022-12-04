import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

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
      <Button
        variant="primary"
        className="justify-content-end"
        onClick={handleShow}
      >
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
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
