import React, { useEffect, useState, useRef } from "react";

//export const host = "http://localhost:5000";
//import axios from "axios";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import styled from "styled-components";
//import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
   const [currentUser, setCurrentUser] = useState(undefined);
  const xyz = async () => {
    if (!localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }
  useEffect( () => {
   xyz()
  },[]);
  console.log("current user" , currentUser)
  useEffect(() => {
    if (currentUser) {
      //socket.current = io(import.meta.env.VITE_HOST);
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  const current =   async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        // const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        // setContacts(data.data);
         const data = await fetch(`http://localhost:5000/api/login/allusers/${currentUser._id}/`,
           {
         method: "GET"
    }).then(response => response.json())
    console.log("setContacts" , data)
      // setContacts(data.data);
      setContacts(data);
      }
       else {
         navigate("/setAvatar");
        
      }
    }}
   useEffect(
  () =>{
    current()
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log("chat is" , chat)
      console.log("current chat" , currentChat)
  };

  return (
    <>
    <Container>
        <div className="container">
     
              <Contacts contacts={contacts} changeChat={handleChatChange} />    
           {currentChat === undefined  ? 
            <Welcome />
          
           : 
            //  <h1 className="text-amber-300">chatttyyyy</h1>
              <ChatContainer currentChat={currentChat} socket={socket} />
          } 
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
