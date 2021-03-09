import React from 'react';
import styled from "styled-components";
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../firebase";

function Header() {
  
    const [user] = useAuthState(auth);
    return (
        <>
        <HeaderConatiner>
        <HeaderLeft>
         <HeaderAvatar
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
          />
         <AccessTimeIcon />
        </HeaderLeft>

           <HeaderSearch>
          <SearchIcon />
          <input placeholder="Search Musty Comunity"/>
           </HeaderSearch>

  
         <HeaderRight>
         <HelpOutlineIcon />
         </HeaderRight>
           
        </HeaderConatiner>
     
            
        </>
    )
}

export default Header

const HeaderRight = styled.div`
  display:flex;
  flex:0.3;
  align-items:"flex-end";

  > .MuiSvgIcon-root{
       margin-left:auto;
       margin-right:20px;
     
  }

`;


const HeaderConatiner = styled.div`
     display:flex;
     position:fixed;
     width:100%;
     padding:10px;
     align-items:center;
     justify-content:"space-between";
     background-color:var(--slack-color);
     color:white;
`;

const HeaderLeft = styled.div`
      flex:0.3;
      display:flex;
      align-items:center;
      margin-left:20px;

      > .MuiSvgIcon-root{
          margin-left:auto;
          margin-right:140px;
      }
`;

const HeaderAvatar = styled(Avatar)`
 cursor: pointer;
 :hover{
     opacity:0.8;
 }
`;

const HeaderSearch = styled.div`
 display:flex;
 flex:0.4;
  border-radius:10px;
  opacity:1;
  background-color:#421f44;
  padding:0 50px;
  color:grey;
  border:1px solid grey;

  > input{
      background-color:transparent;
      border:none;
      min-width:30vw;
      outline:0;
      color:white;
  }

`;