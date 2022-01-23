import React, {useContext, useState} from "react";
import styled from "styled-components";
import device from "../styles/mediaqueries";
import { Context } from "../ContextProvider";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'

import Header from "./Header";
import { useHistory, Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Skeleton } from "@mui/material";
import SearchBar from "./SearchBar";
import { Button } from "@mui/material";
import FilterComponent from "./FilterComponent";
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';


const Container = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
box-sizing:border-box;
  flex-wrap: wrap;
  font-family: ${device.primaryFont};
`;

const UserAndFilterContainer = styled.div`
display:flex;
width:100%;
justify-content:center;
@media${device.tablet}{
    justify-content:center;
}
`
const FakeDiv = styled.div`
width:33%;
flex:1;
@media${device.tablet}{
  display:none;
}
`

const UserDataDIV = styled.div`
  display: flex;
width:100%;
max-width:1440px;
  @media${device.tablet} {
  }
`;

const StyledUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding:0;
  width: 100%;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:2%;


@media${device.mobileL}{
padding:0;
}


`
const ListParagraphs = styled.p`
  font-size: 1.3em;
  margin: 0;

  line-height: 1.8;
  color: #111111;
`;
const ProfileImg = styled.img`
  width:80px;
  height:80px;
  border-radius: 50%;
  border: 1px solid #83e9b5;
  object-fit:cover;
  @media${device.tablet} {
    width:60px;
  height:60px;
    
    object-fit:cover;
  }
`;

const Buttondiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction:column;
  margin-top: 2em;
  justify-content: center;
  width: 100%;
`;

const Paragraph = styled.p`
font-size:1.5em;
margin-top:1.2em;
margin-bottom:0.1em;
`

const PaddingDiv = styled.div`
width:100%;
display:flex;
justify-content:space-between;
@media${device.laptopM}{
  width:93%;
}

@media${device.laptopL}{
  width:85%;
}


@media${device.tablet}{
  width:100%;
  background-color:"yellow";
}

@media${device.mobileM}{
  width:100%;
}

`

const AdList = styled.div`
display:flex;
justify-content:center;
align-items:center;
`

function Mainpage() {
  const { userData, signOut, logout, userAccounts, checkUserMail, filteredData} = useContext(Context);
  const [showFilter, setShowFilter] = useState(false)

  const history = useHistory();


  function goToDetails(inputId) {
    history.push(`profile/${inputId}`);
  }





  const allData = filteredData.map((data, i) => {
    
    return (
      
      <li
        key={data.id}
        onClick={() => goToDetails(data.id)}
        style={{
          marginBottom: "2.3em",
          marginTop: "2em",
          backgroundColor: "#4e89f762",
          borderRadius: "4px",
          padding: "12px 20px",
          maxWidth:"300px",
          width:"80%",
          flex:"0 auto",
          opacity: "0.97",
          cursor: "pointer",
          border: "1px solid white",
          
          
        }}
      >
        <TransitionGroup>
          <Collapse key={i}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ListParagraphs style={{ fontSize: "1.5em", fontWeight: "600" }}>
            {data.firstName}
          </ListParagraphs>
          <ProfileImg src={data.profilePicture}></ProfileImg>
        </div>
        <div style={{ marginTop: "-1em" }}>
          <ListParagraphs>{data.age} år gammal.</ListParagraphs>
          <ListParagraphs>
            Letar efter boende i{" "}
            <span style={{ fontWeight: "600" }}>{data.lookingInArea}</span>.
          </ListParagraphs>

          <ListParagraphs>Månadsavgift: {data.maxRent} SEK.</ListParagraphs>

          
        </div>
        </Collapse>
        </TransitionGroup>
      </li>
      
    );
  });

  
  
  return (
    <Container>
      <Header />
      
      <SearchBar />
      
      <Buttondiv>
        <Link style={{ textDecoration: "none" }} to="/profile">
          <Button variant="contained" size="large" color="success">
            Lägg till annons
          </Button>
        </Link>
        <Paragraph>Filter</Paragraph>
        <FilterListIcon onClick={() => setShowFilter(prev => !prev)}style={{marginTop:"0", fontSize:"1.9em"}}/>
        <AnimatePresence>
          
    {showFilter && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y:0, }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 30,
          duration: 0.4
      }}
      >
       
       <FilterComponent show={showFilter} />
      </motion.div>
    )}
  </AnimatePresence>
        
       
      </Buttondiv>
      
      
      <UserAndFilterContainer allt={userData}>
      <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
              
      >
      {userData.length >= 1 ?
      
        <UserDataDIV>
          
          <StyledUL>{allData}</StyledUL>
          
        </UserDataDIV>
        
      : 
      <UserDataDIV style={{marginTop:"6em", alignItems:"center"}}>
        <Box sx={{ width: 300 }}>
        <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Box>
        </UserDataDIV>
        
      }
      </motion.div>

      </UserAndFilterContainer>
      
    </Container>
  );
  
}

export default Mainpage;
