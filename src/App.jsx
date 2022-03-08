import './App.css';
import Home from './pages/Home';
import Schools from './pages/Schools';
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


Amplify.configure(awsconfig);

function App() {

  return (
      <div className="App">
        <header className="App-header">
          <Authenticator />
          <div>
            <h2>Documents</h2>
            <Button variant="contained" onClick={signOut}>Sign Out</Button>
          </div>
          <div>
            <nav>
              <Link to="/home" >Home</Link>
              <Link to="/schools" >Schools</Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
        </Routes>
      </div>
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