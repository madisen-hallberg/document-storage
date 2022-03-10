import { Link, useLocation } from "react-router-dom";
import { Paper, Button, TextField, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState, useEffect } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listDocuments } from '../graphql/queries';
import { createDocument, deleteDocument } from '../graphql/mutations';
import { v4 as uuid } from 'uuid';
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';

  
export default function Documents( ) {

    

  const location = useLocation();
  const { user } = location.state

  const [ showAddDoc, setShowAddNewDoc ] = useState(false)
  const [ docs, setDocs ] = useState([]);
  const [ docViewing, setDocViewing ] = useState('')

  useEffect(() => {
    fetchDocs();
  }, []);

  const viewDoc = async idx => {
      if (docViewing === idx) {
          setDocViewing('')
          console.log(setDocViewing);
          return
      }

      const docFilePath = docs[idx].filePath;
      console.log(docFilePath);
      try {
          const fileAccessURL = await Storage.get(docFilePath, { expires: 60 })
          console.log(fileAccessURL);
          window.open(fileAccessURL);
          return
      } catch (error) {
          console.log("error: "+ error);
      }
      setDocViewing(idx);
  }

  const deleteDoc = async idx => {

    const docFilePath = docs[idx].filePath;
    console.log(docFilePath);
    try {
        await Storage.remove( docFilePath )
        console.log("Document Deleted");
        return
    } catch (error) {
        console.log("error: "+ error);
    }
}


  const fetchDocs = async () => {
      try {

      const docData = await API.graphql(
        graphqlOperation( 
          listDocuments, {
            filter: {
              userDocumentsId: {eq: user.id}
            }
          }
        ) 
      )
      const docList = docData.data.listDocuments.items;
      console.log('doc list', docList );
      setDocs(docList)

      } catch (error) {
      console.log('error on fetching documents', error);
      }
  }



  return (
      <div className = "list">
      <h1>{ user.name }'s Documents</h1>
      { docs.map((doc, idx) => {
          if(!doc._deleted) {
            return (
                <Paper key={idx} variant ="outlined" elevation={2} square >
                  <div className="card">
                      <div className="name" >{doc.name}</div>
                      <div className="buttonGroup">
                        <Button onClick={() => viewDoc(idx)}>View</Button>
                        <RemoveDoc
                            doc = { doc }
                            onDelete={() => {
                                deleteDoc(idx)
                                fetchDocs()
                            }}
                        />
                      </div>
                  </div>
                </Paper>
              )
          }
          else return null;
      })}
      {showAddDoc ? (
          <AddDoc
            user = { user }
            onUpload={() => {
              setShowAddNewDoc(false)
              fetchDocs()
            }}
            
          />
        ) : (
          <IconButton onClick={() => setShowAddNewDoc(true)}>
            <AddIcon />
          </IconButton>
        )}
    </div>
  );
}

const AddDoc = ({onUpload, user}) => {
  const [docData, setDocData] = useState({});
  const [fileData, setFileData] = useState()

  const uploadDoc = async () => {
    console.log(user);

    //Upload the Document
    console.log('docData', docData);
    const { name } = docData;

    const { key } = await Storage.put(`${uuid()}.pdf`, fileData, { contentType: 'application/pdf'});

    
    const createDocumentInput ={
      id: uuid(),
      userDocumentsId: user.id,
      filePath: key,
      name
    }

    await API.graphql(graphqlOperation(createDocument, {input: createDocumentInput}));
    onUpload();
  };

  return (
    <div className = "new">
      <TextField
        label="Name"
        value={docData.name}
        onChange={e => setDocData({ ...docData, name: e.target.value})}
      />
      <input type = "file" accept="application/pdf" onChange={e => setFileData(e.target.files[0])} />

      <IconButton onClick={ uploadDoc } >
        <PublishIcon />
      </IconButton>
    </div>
  )
}

const RemoveDoc = ({ onDelete, doc }) => {
  
    const removeDoc = async () => {
  
      //Delete the Document
  
      
      const deleteDocumentInput ={
        id: doc.id,
        _version: doc._version
      }
  
      await API.graphql(graphqlOperation(deleteDocument, {input: deleteDocumentInput}));
      onDelete();
    };
  
    return(
        <IconButton  onClick = { removeDoc }>
            <DeleteIcon />
        </IconButton>
    )
}