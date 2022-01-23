import React, {useContext} from "react";
import styled from "styled-components";
import device from "../styles/mediaqueries";
import bgpic from "../styles/testbg2.png";
import {Link} from "react-router-dom"
import { Context } from "../ContextProvider"
import Loader from "./Loader";

const Container = styled.div`
 
  box-sizing: border-box;
  height:100vh;
  font-family: ${device.primaryFont};
  background-image: url(${bgpic});
  object-fit:contain;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  width:100vw;
  @media${device.tablet} {
    
    height:100vh;
  }
`;



const PrivboContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
    justify-content: center;
    flex-direction: column;
  height: 55vh;
  @media${device.tablet} {

    
  }
`;

const Privbotext = styled.h1`
  color: #000;
  font-weight: 600;
  font-size:6.5em;
  padding: 0;
  margin:0;
  letter-spacing:0.01em;
  @media${device.tablet} {
    font-size: 4.5em;
  }
`;

const Privboparagraph = styled.p`
padding: 0;
  margin:0;
  font-weight:600;
font-size:1.6em;
margin-top:-1.4em;
color:#000;

@media${device.tablet}{
  margin-top:-0.9em;
}
`

const Regbutton = styled.button`
  border-radius: 25px;
  border: none;
  background-color: #fa7fb2;
  padding: 5px 15px;
  height: 2em;
  width: 280px;
  height: 3.5em;
  color: white;
  font-family: ${device.primaryFont};
  font-size: 0.9em;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  border: 1px solid #dbd5d5;
  :hover {
    background-color: #f33282;
  }
`;

const Loginbutton = styled.button`
  margin-top: 1.5em;
  border-radius: 25px;
  border: none;
  background-color: #636cf6;
  padding: 5px 15px;
  height: 2em;
  width: 280px;
  height: 3.5em;
  color: white;
  font-family: ${device.primaryFont};
  font-size: 0.9em;
  font-weight: 600;
  letter-spacing: 2.5px;
  border: 1px solid #dbd5d5;
  cursor: pointer;

  :hover {
    background-color: #303beb;
  }
`;

const LoadingContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100vw;
height:100vh;
`


const Buttonsdiv = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 2;

  @media${device.tablet}{

  }
`;

function Landingpage() {

const {isLoading} = useContext(Context)
  console.log("is loading is:",isLoading)
  return (
    <>{isLoading ? 
    <Container>
      
      <PrivboContainer>
        <Privbotext>Privbo</Privbotext>
        <Privboparagraph>Hitta ditt drömboende.</Privboparagraph>
      </PrivboContainer>

      
        <Buttonsdiv>
          <Link to="/login"><Regbutton>LOGGA IN</Regbutton></Link>
          <Link to="/register"><Loginbutton>REGISTRERA</Loginbutton></Link>
        </Buttonsdiv>
    </Container> : <LoadingContainer><Loader/></LoadingContainer>}
    </>
  )
}

export default Landingpage;
