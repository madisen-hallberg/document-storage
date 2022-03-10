import { Link, useLocation } from "react-router-dom";
import { Paper, Button, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState, useEffect } from 'react';
import { createUser } from '../graphql/mutations';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../graphql/queries';
import { v4 as uuid } from 'uuid';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';

  
export default function Users( ) {

  const location = useLocation();
  const { school } = location.state

  const [ showAddUser, setShowAddNewUser ] = useState(false)
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
      try {

      const userData = await API.graphql(
        graphqlOperation( 
          listUsers, {
            filter: {
              schoolUsersId: {eq: school.id}
            }
          }
        ) 
      )
      const userList = userData.data.listUsers.items;
      console.log('doc list', userList );
      setUsers(userList)

      } catch (error) {
      console.log('error on fetching users', error);
      }
  }



  return (
      <div className = "list">
      <h1>{ school.name }</h1>
      <h2> Students </h2>
      { users.map(user => {
        return (
          <Paper key={user.id} variant ="outlined" elevation={2} square >
            <div className="card">
              <div className="name">{user.name}</div>
              <Link to="/documents" style={{ textDecoration: 'none' }} state = {{ user: user }} >
                <Button>Documents</Button>
              </Link>
            </div>
          </Paper>
        )
      })}
      {showAddUser ? (
          <AddUser
            school = { school }
            onUpload={() => {
              setShowAddNewUser(false)
              fetchUsers()
            }}
            
          />
        ) : (
          <IconButton onClick={() => setShowAddNewUser(true)}>
            <AddIcon />
          </IconButton>
        )}
    </div>
  );
}

const AddUser = ({onUpload, school}) => {
  const [userData, setUserData] = useState({});

  const uploadUser = async () => {
    console.log(school);

    //Upload the User
    console.log('userData', userData);
    const { name } = userData;
    const createUserInput ={
      id: uuid(),
      schoolUsersId: school.id,
      name
    }

    await API.graphql(graphqlOperation(createUser, {input: createUserInput}));
    onUpload();
  };

  return (
    <div className = "new">
      <TextField
        label="Name"
        value={userData.name}
        onChange={e => setUserData({ ...userData, name: e.target.value})}
      />
      <IconButton onClick={uploadUser} >
        <CheckCircle />
      </IconButton>
    </div>
  )
}