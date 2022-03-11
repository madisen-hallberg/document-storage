import '../App.css';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {

  return (
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand className = "title">Student Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className = "me-auto stroke">
                <Nav.Link activeClassName="active" href="/home">Home</Nav.Link>
                <Nav.Link activeClassName="active" href="/programs">Programs</Nav.Link>
                <Nav.Link activeClassName="active" href="/about">About</Nav.Link>
              </Nav>
              <Button variant="contained" onClick={signOut}>Sign Out</Button>
            </Navbar.Collapse>
          </Container>  
        </Navbar>
  );
}

async function signOut() {
  try {
      await Auth.signOut({ global: true });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}