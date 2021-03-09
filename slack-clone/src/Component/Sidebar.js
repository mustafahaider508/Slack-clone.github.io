import React from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SidebarOption from "./SidebarOption";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {useCollection} from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import firebase from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


function Siderbar() {
  
    const [Channels,loading,error] = useCollection(db.collection("rooms"));
    const [user] = useAuthState(auth);
    return (
        <SidebarContainer>
         <SidebarHeader>
           <SidebarInfo>
               <h2>{user.displayName}</h2>
               <h3>
                <FiberManualRecordIcon />
                active
                </h3>
           </SidebarInfo>
           <CreateIcon /> 
         </SidebarHeader>
         <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
         <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
         <SidebarOption Icon={DraftsIcon} title="Saved items"/>
         <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
         <SidebarOption Icon={PeopleAltIcon} title="Peoples & user groups"/>
         <SidebarOption Icon={AppsIcon} title="Apps"/>
         <SidebarOption Icon={FileCopyIcon} title="File browser"/>
         <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
         <hr />
         <SidebarOption Icon={ExpandMoreIcon } title="Channels"/>
         <hr />
         <SidebarOption Icon={AddIcon} addChannelOption title="Add Channels"/>

    {Channels?.docs.map(doc =>(
        <SidebarOption key={doc.id} id={doc.id}  title={doc.data().name}/>

    ))}
            
        </SidebarContainer>
    )
}

export default Siderbar

const SidebarContainer = styled.div`
    background-color:var(--slack-color);
    flex:0.3;
     color:white;
     margin-top:60px;
     max-width:260px ;
     border-top:1px solid #49274b;

    >hr {
        margin-top:10px;
        margin-bottom:10px;
        border:1px solid #49274b;

    }
`;

const SidebarHeader = styled.div`
    display:flex;
    padding:20px;
    border-bottom:1px solid #49274b; 

    > .MuiSvgIcon-root {
        padding:8px;
        font-size:18px;
        background-color:white;
        color:#49274b;
        border-radius:999px;
    }
`;

const SidebarInfo = styled.div`
  flex:1;
  >h2 {
      font-size:15px;
      margin-bottom:5px;
      font-weight:500;
  }
  >h3{
      font-size:13px;
      display:flex;
      align-items:center;
      font-weight:400;
  }
  >h3 >.MuiSvgIcon-root {
      font-size:14px;
      margin-top:1px;
      margin-right:2px;
      color:green;
  }
`;
