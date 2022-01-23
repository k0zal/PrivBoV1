import React, { useState, useRef, useContext } from "react";
import device from "../styles/mediaqueries";

import styled from "styled-components";
import registerpic from "../styles/registerbg.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
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
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  text-align: center;
  @media${device.tablet} {
    font-size: 1.9em;
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
`;

const Legalparagraph = styled.p`
  font-size: 20px;
  width: 70%;
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

  border-radius: 10px;

  @media${device.tablet} {
    padding: 0 15px;
    max-width: 460px;
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

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef(null);
  const { createAccount, createUserWithEmailAndPassword, auth, addDoc, usersRef, errMessage, isLoading} =
    useContext(Context);

  const history = useHistory();
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
          <Privbotext>Skapa Konto</Privbotext>
          <Form
            ref={formRef}
            onSubmit={(e) => createAccount(e, email, password, firstName, lastName, age )}
          >
            <TextField
              id="outlined-basic"
              label="Förnamn"
              margin="normal"
              type="text"
              required
              inputProps={{ maxLength: 25, minLength: 2 }}
              style={{ width: "280px" }}
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Efternamn"
              margin="normal"
              required
              inputProps={{ maxLength: 30, minLength: 2 }}
              style={{ width: "280px" }}
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
          id="outlined-basic"
          label="Ålder"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
          inputProps={{ max: 100, min: 18 }}
          required
          type="number"
          style={{ width: "280px" }}
          variant="outlined"
        />
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
            {errMessage && <Legalparagraph style={{fontSize:"1em", color:"#cc0000"}}>{errMessage}</Legalparagraph>}
            <Legalparagraph>
              <Checkbox required inputProps={{ "aria-label": "controlled" }} />
              By signing up you accept the Terms of service and Privacy Policy
            </Legalparagraph>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                marginTop: "1.2em",
                marginBottom: "1em",
                width: "280px",
              }}
              color="success"
            >
              REGISTRERA
            </Button>
          </Form>
        </InputContainer>

        <Desktopcontainer>
        <Image src={registerpic}/>
        </Desktopcontainer>
      </Paddingcontainer>
    </Container>
: <LoadingContainer><Loader/></LoadingContainer>}</>
  );
}

export default Register;
