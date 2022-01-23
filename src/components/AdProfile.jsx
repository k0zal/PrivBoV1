import React, {useContext, useEffect, useState} from 'react'
import styled from "styled-components"
import device from "../styles/mediaqueries";
import { Context } from "../ContextProvider";
import Header from './Header';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFree from '@mui/icons-material/SmokeFree';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import { motion} from 'framer-motion/dist/framer-motion'
import Modalhandler from './Modalhandler';


const Container = styled.div`
padding:0;
margin:0;
`

const CardWrapper = styled.div`
margin-top:2.5em;
width:100%;
justify-content:space-between;
align-items:center;
border-radius:7px;
display: flex;
margin-bottom:1em;

@media${device.tablet}{
    margin-top:3em;
    flex-direction:column;
    align-items:center;
}
`

const Topline = styled.div`
  width: 100vw;
  height: 2.5em;
  background-color: #5666f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: #e2dfdf;
  font-weight:500;
  position:relative;
`;

const Backarrow = styled.div`
position:absolute;
left:10px;
display: flex;
align-items: center;

`

const TopText = styled.div`
display: flex;
width:100%;
justify-content: center;
align-items:center;
`

const Ulwrapper = styled.ul`
list-style-type: none;
width:100%;
padding:0 3em;
display:flex;



@media${device.tablet}{
    width:85%;
    flex-direction:column;
    padding:0;
}
`

const H1text = styled.h1`
font-size: 1.2em;
font-weight:400;



`

const DesktopDivLeft = styled.div`
flex:1;
flex-direction:column;
display:flex;
word-break:break-word;

`

const DesktopDivRight = styled.div`
flex:1;
margin-left:1.5em;

@media${device.tablet}{
    margin-left:0;
}
`

const ProfileImg = styled.img`
object-fit:contain;
width:45%;
border-radius:10px;
max-width:350px;
display:flex;
margin:0 auto;

@media${device.tablet}{
    width:80%;
    height:10%;
}
`

const UserDetails = styled.div`
background-color:#d5d8ed;
border-radius:6px;


display:flex;
flex-direction:column;
padding: 0.6em 1.3em;


@media${device.tablet}{
    margin-top:1.5em;
}
`
const Ptext = styled.p`
font-size:1.1em;
padding:0;
margin:0;
margin-bottom:0.7em;
`

const FillerDiv = styled.div`
width:100%;
margin:1.3em 0;
border-bottom:0.5px solid #979797a6;
display: flex;
    align-items: center;
    justify-content: space-between;

`

const Buttondiv = styled.div`
display: flex;
justify-content: center;
align-items:center;`



function AdProfile() {
const {userData, userAccounts, checkUserMail, removeAd, setModalState, modalState} = useContext(Context)
const {id} = useParams()

const user = userData.find(data => {
    return data.id === id
})


    // 1. Filter the signed in user by email


    // 2. Filter the firstName using the signed in users email
        

const [focusBool, setFocusBool] = useState(false)

useEffect(() => {
   window.scrollTo(0,0);
}, [])

useEffect(() => {
  console.log("modal state is:", modalState)
}, [modalState])

const history = useHistory()

    return (
        
        <Container>
            <Modalhandler/>
            <Header/>
        <Topline>
      <Backarrow>
        <ArrowBackIcon onClick={history.goBack} style={{fontSize:"2em", cursor:"pointer"}}/>
        </Backarrow>
        
        <TopText>
        Privbo
        </TopText>

        </Topline>
        <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      
      
      >
        {user &&
        <CardWrapper>
        <Ulwrapper>
            
            <Modalhandler sendToMail={user.email} focusBool={focusBool}/>
            <DesktopDivLeft>
            <li style={{padding:"0", margin:"0",}}><ProfileImg src={user.profilePicture}/></li>
            <li><H1text style={{fontWeight:"600", fontSize:"1.5em", textAlign:"center"}}>{user.firstName} {user.lastName}</H1text></li>
            <li style={{wordWrap:"break-word", display:"flex", justifyContent:"center", alignItems:"center"}}><H1text style={{marginTop:"0.3em",}}>{user.description}</H1text></li>
            </DesktopDivLeft>
            
            <DesktopDivRight>
            <UserDetails>
                <FillerDiv><Ptext>Ålder</Ptext>
                <Ptext>{user.age}</Ptext>
                </FillerDiv>
                <FillerDiv>
                    <Ptext>Söker boende i</Ptext>
                    <Ptext>{user.lookingInArea}</Ptext>
                </FillerDiv>

                <FillerDiv>
                    <Ptext>Månadskostnad</Ptext>
                    <Ptext>{user.maxRent} SEK</Ptext>
                </FillerDiv>

                <FillerDiv style={{margin:"0", alignSelf:"flex-start"}}>
                    <Ptext>Rökare</Ptext>
                    <Ptext>{user.smoker ? <SmokingRoomsIcon style={{fontSize:"2em"}}/> : <SmokeFree style={{fontSize:"2em"}}/>}</Ptext>
                </FillerDiv>

                <FillerDiv>
                    <Ptext>Nummer</Ptext>
                    <Ptext>{user.phoneNumber}</Ptext>
                </FillerDiv>

                <FillerDiv>
                    <Ptext>Husdjursfri</Ptext>
                    <Ptext>{user.hasPets ? <CloseIcon /> : <CheckIcon/>}</Ptext>
                </FillerDiv>

                <FillerDiv>
                    <Ptext>Årslön</Ptext>
                    <Ptext>{user.yearlySalary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} SEK</Ptext>
                </FillerDiv>
                <Buttondiv>
                    {user.email === checkUserMail && <Button
                    onClick={() => removeAd(user.id)}
          variant="contained"
          size="large"
          style={{
            marginTop: "0.2em",
            marginBottom: "1em",
            padding: "0.9em",
            width: "280px",
          }}
          color="error"
        >
          Ta bort annons
        </Button>
        }

{user.email != checkUserMail && <Button
          variant="contained"
          size="large"
          onClick={() => {setModalState(prevState => !prevState); setFocusBool(true)}}
        //   onClose={() => setModalState(false)}
          style={{
            marginTop: "0.2em",
            marginBottom: "1em",
            padding: "0.9em",
            width: "280px",
          }}
          color="primary"
        >
          Kontakta
        </Button>
        }

        

        </Buttondiv>
            </UserDetails>
         
            </DesktopDivRight>
            
        </Ulwrapper>
        
        </CardWrapper>
}
</motion.div>
        </Container>
        
    )
}

export default AdProfile
