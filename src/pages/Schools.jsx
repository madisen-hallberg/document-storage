import { API, graphqlOperation } from 'aws-amplify';
import { listSchools } from '../graphql/queries';
import { createSchool, deleteSchool } from '../graphql/mutations';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import { Paper, Button, TextField, IconButton } from '@material-ui/core';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';



/**
 * List of schools in our database, with read and write options.
 */
export default function Schools() {
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
        <div className = "list">
            <h2>Programs</h2>
        { schools.map(school => {
            if(!school._deleted){
                return (
                    <Paper key={school.id} variant ="outlined" elevation={2} square >
                        <div className="card">
                            <div className="name">{school.name}</div>
                            <div className="buttonGroup">
                                <Link to="/students"  style={{ textDecoration: 'none' }} state = {{ school: school }} >
                                    <Button>Students</Button>
                                </Link>
                                <RemoveSchool
                                    school = { school }
                                    onDelete={() => {
                                        fetchSchools()
                                    }}
                                />
                            </div>
                        </div>
                    </Paper>
                )
            } else return null;  
        })}
        {showAddSchool ? (
            <AddSchool onUpload={() => {
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


  

/**
 * Returns the UI Form to add a school name and the button to commit it's creation.
 * This triggers GraphQL API Operation to create a school item in our database.
 */
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
      <div className = "new">
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

/**
 * Returns the delete button.
 * When clicked, it triggers GraphQL API Operation to remove a school item from our database.
 */
const RemoveSchool = ({ onDelete, school }) => {

    const removeSchool = async () => {

        //Delete the User    
        const deleteSchoolInput ={
        id: school.id,
        _version: school._version
        }

        await API.graphql(graphqlOperation(deleteSchool, {input: deleteSchoolInput}));
        onDelete();
    };

    return(
        <IconButton  onClick = { removeSchool }>
            <DeleteIcon />
        </IconButton>
    )
}