import React, {useState, useEffect}from 'react';
import './App.css';
import {FormControl, InputLabel, Input} from '@material-ui/core'
import Message from './Message';
import db from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
// import FlipMove from 'react-flip-move'
function App() {
  const [input,setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [username, setUsername]= useState('');

  //useState() = setup the variable in React
  //useEffect() = run the piece of a code on a condition

  useEffect(() => {
    //run code here...
    // if its blank inside [], this code run only once during the page load
   // const name = prompt('Please enter your name');
   setUsername(prompt('Please enter your name'));
  }, []) //condition

  useEffect(() => {
    // run once when app component loads

    db.collection('message')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessage(snapshot.docs.map(doc => ({id:doc.id, message: doc.data()})))
    })
  }, [])
  const sendMessage = (event) =>{
    //all the logic for send the message 
    event.preventDefault();
    db.collection('message').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="logo"/>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
            <Input className="app__input" placeholder='Enter a message...' value={input} onChange={(event) => setInput(event.target.value)}/>
            <IconButton className="app__iconButton" disabled={!input} type='submit'   variant="contained" color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton> 
        </FormControl>
      </form>
      
     <FlipMove>
      {
        message.map(({id,message}) => (
          <Message key={id} username={username} message={message}/>
        )) 
      }
     </FlipMove>
    </div>
  );
}

export default App;
