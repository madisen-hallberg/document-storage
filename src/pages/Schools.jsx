import { Paper, Button, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState, useEffect } from 'react';
import { createSchool } from '../graphql/mutations';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { API, graphqlOperation } from 'aws-amplify';
import { listSchools } from '../graphql/queries';
import { v4 as uuid } from 'uuid';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';

export default function Schools({}) {


    const [ showAddSchool, setShowAddNewSchool ] = useState(false)
    const [schools, setSchools ] = useState([]);
  
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
        <div className = "schoolList">
        { schools.map(school => {
          return (
            <Paper key={school.id} variant ="outlined" elevation={2} square>
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
    );
  }

  const AddSchool = ({onUpload}) => {
    const [schoolData, setSchoolData] = useState({});
  
    const uploadSchool = async () => {
  
      //Upload the School
      console.log('schoolData', schoolData);
      const { name } = schoolData;
      const createSchoolInput ={
        id: uuid(),
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
          onChange={e => setSchoolData({ ...schoolData, name: e.target.value})}
        />
        <IconButton onClick={uploadSchool} >
          <CheckCircle />
        </IconButton>
      </div>
    )
  }