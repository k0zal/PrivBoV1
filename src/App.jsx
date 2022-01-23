import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import Landingpage from "./components/Landingpage";
import Mainpage from "./components/Mainpage";
import Register from "./components/Register";
import AdProfile from "./components/AdProfile";
import { Context } from "./ContextProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAd from "./components/CreateAd";
import ErrorPage from "./components/ErrorPage";
import Messages from "./components/Messages";

const Container = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

function App() {
  const { loggedState, userData } = useContext(Context);
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path="/">
            {loggedState ? <Mainpage /> : <Landingpage />}
          </Route>
        
          <Route path="/register">
            {loggedState ? <Mainpage /> : <Register />}
          </Route>
       
          <Route path="/login">{loggedState ? <Mainpage /> : <Login />}</Route>
        
          <Route path="/profile/:id">
            {loggedState ? <AdProfile /> : <Landingpage />}
          </Route>
       
          <Route exact path="/profile">
            {loggedState ? <CreateAd /> : <Landingpage />}
          </Route>
        
          <Route path="/messages">
            {loggedState ? <Messages /> : <Landingpage />}
          </Route>
        
       
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>

        {/* {userData.length >= 1 && <Footer />} */}
        {/* <Switch>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch> */}
      </Container>
    </Router>
  );
}

export default App;
