import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {useSelector} from "react-redux";
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
 
function Chat() {
    const roomId = useSelector(selectRoomId);
    const chatRef = useRef(null);
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );

     const [loading] = useCollection(
         roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc")
      );

    const [roomMessages,setRoomMessages] = useState([]);

    useEffect(() =>{
           if (roomId) {

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map(doc => doc.data())))
           }

    },[roomId]);

    useEffect(() =>{
        chatRef?.current.scrollIntoView({
            behavior:"smooth",
        });

    },[roomId,loading]);
  




    return (
        <ChatComponent>
        
        <>
            <Header>
                <HeaderLeft>
                    <h4>{roomDetails?.data().name}</h4>
                     <StarBorderIcon />
                </HeaderLeft>
                

                <HeaderRight>
                   <p>
                   <InfoOutlinedIcon /> Details
                   </p>
                </HeaderRight>
            </Header>

            <ChatMessages>
         
            {roomMessages.map(({message,timestamp,user,userImage}) =>(
                <Message  message={message} timestamp={timestamp} user={user} userImage={userImage} /> 
            ))}

           <ChatBottom ref={chatRef} />
            
            </ChatMessages>
            
            <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId} />
            </>
        </ChatComponent>
    )
}

export default Chat

 const ChatComponent = styled.div`
   flex:0.7;
   flex-grow:1;
   overflow-y:scroll;
   margin-top:60px;
 `;

 const ChatMessages = styled.div`
  
 
 `;
 const ChatBottom = styled.div`
  padding-bottom:200px;
 `;

 const Header = styled.div`
   display:flex;
   justify-content:space-between;
   padding:20px;
   border-bottom:1px solid lightgray;
 `;

 const HeaderLeft = styled.div`
  display:flex;
  align-items:center;
  margin-right:10px;

  >h4{
      display:flex;
      text-transform:lowercase;
  }
   >h4 .MuiSvgIcon-root{
       padding:10px;
       font-size:18px;
   }
 `;

 const HeaderRight = styled.div`
   

   >p{
       font-weight:300;
    display:flex;
   align-items:center;
   }
   >p .MuiSvgIcon-root{
       margin-right:5px;
   }
 `;
