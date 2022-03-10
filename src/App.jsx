import './App.css';
import Home from './pages/Home';
import Schools from './pages/Schools';
import Users from './pages/Users';
import Documents from './pages/Documents';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import {
  Authenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';


Amplify.configure(awsconfig);

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar expand="lg">
          <Container>
            <Authenticator />
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
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/programs" element={<Schools />} />
          <Route path="/students" element={<Users />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

async function signOut() {
  try {
      await Auth.signOut({ global: true });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}


export default withAuthenticator( App );