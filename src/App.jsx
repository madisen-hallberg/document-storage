import './App.css';
import Header from './components/Header';
import Router from './components/Router';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import {  withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


Amplify.configure(awsconfig);

function App() {

  return (
    <BrowserRouter>
    <Authenticator />
      <div className="App">
       <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default withAuthenticator( App );