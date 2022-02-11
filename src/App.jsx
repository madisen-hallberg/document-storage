import './App.css';
import { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import {
  Authenticator,
  withAuthenticator,
  Button
} from '@aws-amplify/ui-react';
import { listSchools } from './graphql/queries';
import { Auth } from 'aws-amplify';


Amplify.configure(awsconfig);

function App() {

  const [schools, setSchools ] = useState([])

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const schoolData = await API.graphql(graphqlOperation( listSchools ))
      const schoolList = schoolData.data.listSchools.items;
      console.log('doc list', schoolList );
      setSchools(schoolList)

    } catch (error) {
      console.log('error on fetching schools', error);
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <Authenticator />
          <h2>App Contents</h2>
          <Button onClick={signOut}>Sign Out</Button>
        </header>
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
