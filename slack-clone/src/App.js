import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import styled from "styled-components";
import Chat from './Component/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase";
import Login from "./Component/Login";
import Spinner from "react-spinkit";

function App() {
 
  const [user,loading] = useAuthState(auth);

   if(loading){
     return(
       <AppLoading>
         <AppLoadingContents>
            <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" alt="" />
         
         <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
         
         
         </AppLoadingContents>
       </AppLoading>
     )
   }

  return (
    <div className="app">
    <Router>
    {!user ?(
      <Login />
    ):(

      <>
      <Header />
      <Appbody>
      <Sidebar />
      <Switch>
          <Route exact path="/">
             <Chat/>
          </Route>
        </Switch>
      </Appbody>
        
      </>

    )}
      
    </Router>
    </div>
  )
}
export default App;

const Appbody = styled.div`
  display:flex;
  height:100vh;
 
`;
const AppLoading = styled.div`
   display:grid;
   place-items:center;
   width:100%;
   height:100vh;
  
`;

const AppLoadingContents = styled.div`
 text-align:center;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
   padding-bottom:100px;
 
  >img{
    height:100px;
    padding:20px;
    margin-bottom:40px;
  }

`;