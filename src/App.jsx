import './App.css';
import { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import {
  Authenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listSchools } from './graphql/queries';
import { createSchool } from './graphql/mutations';
import { Auth } from 'aws-amplify';
import { Paper, Button, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { v4 as uuid } from 'uuid';


Amplify.configure(awsconfig);

function App() {

  const [schools, setSchools ] = useState([]);
  const [ showAddSchool, setShowAddNewSchool ] = useState(false)

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
          <Button variant="contained" onClick={signOut}>Sign Out</Button>
          <h2>Documents</h2>
        </header>
          <div className = "schoolList">
            { schools.map(school => {
              return (
                <Paper variant ="outlined" elevation={2} square>
                  <div className="schoolCard">
                    <div className="schoolName">{school.name}</div>
                  </div>
                </Paper>
              )
            })}
            {showAddSchool ? (
                <AddSchool onUpload={( {}) => {
                  setShowAddNewSchool(false)
                  fetchSchools()
                }}/>
              ) : (
                <IconButton onClick={() => setShowAddNewSchool(true)}>
                  <AddIcon />
                </IconButton>
              )}
          </div>
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


const AddSchool = ({onUpload}) => {
  const [schoolData, setSchoolData] = useState({});

  const uploadSchool = async () => {

    //Upload the School
    console.log('schoolData', schoolData);
    const { name } = schoolData;
    const createSchoolInput ={
      id: uuid(),
      // eslint-disable-next-line no-restricted-globals
      name
    }

    await API.graphql(graphqlOperation(createSchool, {input: createSchoolInput}));
    onUpload();
  };


  

  return (
    <div className = "newSchool">
      <TextField
        label="Name"
        value={schoolData.name}
        onChange={e => setSchoolData({ ...schoolData, title: e.target.value})}
      />
      <IconButton onClick={uploadSchool} >
        <CheckCircle />
      </IconButton>
    </div>
  )
}