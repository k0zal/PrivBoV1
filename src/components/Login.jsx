import React, { useState, useContext, useEffect } from "react";
import device from "../styles/mediaqueries";
import styled from "styled-components";
import registerpic from "../styles/registerbg.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Context } from "../ContextProvider";
import Loader from "./Loader"; 


const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: ${device.primaryFont};
  @media${device.tablet} {
  }
`;

const Privbotext = styled.h1`
  color: #333;
  font-weight: 600;

  @media${device.tablet} {
    font-size: 3.5em;
    margin-top: 1em;
  }
`;

const Legalparagraph = styled.p`
  font-size: 16px;
  width: 70%;
  color: #e90808;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paddingcontainer = styled.div`
  display: flex;
  height:99vh;
  width: 100vw;
  @media${device.tablet} {
    height: auto;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -7em;
  border-radius: 10px;
  margin-right:0.5em;
  @media${device.tablet} {
    padding: 0 15px;
    max-width: 460px;
    margin-top: 6em;
  }
`;

const Inputfield = styled.input`
  border: 1px solid #cecece;
  border-radius: 5px;
  padding: 10px 25px;
  width: 75%;
  max-width: 370px;
  margin-top: 1.8em;
  font-size: 1.2em;
  @media${device.tablet} {
    margin-top: 1.5em;
    background-color: transparent;
    color: #686767;
    outline: 0;

    font-size: 1.1rem;
  }
  &:focus {
    border-color: #fa7fb2;
  }

  ::placeholder {
    font-size: 0.9em;
    color: #949393;
  }
`;

const Topline = styled.div`
  width: 100%;
  height: 2.5em;
  background-color: #5666f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: #e2dfdf;
  font-weight: 500;
  position: relative;
`;

const TopText = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Backarrow = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
`;

const Desktopcontainer = styled.div`
  
  display:flex;
  @media${device.tablet} {
    display: none;
  }

  @media${device.desktop} {
    flex:2;
  }
`;

const Image = styled.img`
max-width:100%;
max-height:100%;

object-fit:cover;
@media${device.tablet} {
  display: none;
}
`

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100vw;
height:100vh;
`

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth, signInWithEmailAndPassword, errorMessage, loggedState, successLogin, isLoading } =
    useContext(Context);

  const history = useHistory();

  useEffect(() => {
    {
      loggedState && history.push("/");
    }
  }, [loggedState]);

  return (
    <>{isLoading ? 
    <Container>
      <Topline>
        <Backarrow>
          <ArrowBackIcon
            onClick={history.goBack}
            style={{ fontSize: "2em", cursor: "pointer" }}
          />
        </Backarrow>
        <TopText>Privbo</TopText>
      </Topline>
      <Paddingcontainer>
        <InputContainer>
          <Privbotext>Logga in</Privbotext>

          <Form onSubmit={(e) => login(e, email, password)}>
            <TextField
              id="outlined-basic"
              label="E-mail"
              inputProps={{ maxLength: 50, minLength: 2 }}
              type="email"
              margin="normal"
              required
              style={{ width: "280px" }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Lösenord"
              margin="normal"
              inputProps={{ minLength: 8, maxLength: 99 }}
              required
              type="password"
              style={{ width: "280px" }}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage && <Legalparagraph>{errorMessage}</Legalparagraph>}
            
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{ marginTop: "0.1em", width: "280px" }}
              color="success"
            >
              LOGGA IN
            </Button>
          </Form>
        </InputContainer>

        <Desktopcontainer>
          <Image src={registerpic}/>
        </Desktopcontainer>
      </Paddingcontainer>
    </Container>: <LoadingContainer><Loader/></LoadingContainer>
    }</>
  );
}

export default Login;
