import React, {useContext, useState, useEffect} from 'react'
import styled from "styled-components"
import { Context } from "../ContextProvider"
import logoicon from "../styles/privbotest.png"
import {Link} from "react-router-dom"
import device from "../styles/mediaqueries";
import { Tooltip, Avatar, IconButton, Menu, MenuItem, Divider, ListItemIcon} from '@mui/material'

import { Settings } from '@mui/icons-material'
import { Logout } from '@mui/icons-material'
import { Badge } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message';





const Container = styled.div`
display:flex;
width:100%;
flex-wrap:wrap;
font-family:${device.primaryFont};
justify-content:center;

@media${device.tablet}{
    
}
`

const Headercontainer = styled.div`
width:100%;
display:flex;
align-items:flex-start;

height:13vh;
`

const Linksdiv = styled.div`
display:flex;
justify-content: flex-end;
align-items:center;
height:10vh;
width:90%;
padding:10px 25px;

@media${device.mobileM}{
    
    align-items:center;
    width:100%;
    font-size:0.8em;
    
}
`

const Logodiv = styled.div`
width:15%;


@media${device.mobileS}{
    width:10%;
}
`

const Logoimg = styled.img`
margin-top:-2em;
width:100%;
min-width:150px;
object-fit:contain;


@media${device.mobileL}{
    /* display:none; */
    min-width:100px;
    margin-top:0;
    
}
@media${device.mobileS}{
    margin-left:-15px;
}
`

const Links = styled.p`
padding:3px 10px;
font-size:1.5em;
color:#333;
flex-wrap:wrap;
`

const MessageDiv = styled.div`
margin-right:0.7em;
cursor:pointer;
`


function Header() {
    const {logout, userAccounts, checkUserMail} = useContext(Context);
    const [anchorEl, setAnchor] = useState(null);
    const [firstLetter, setFirstLetter] = useState() 
    const open = anchorEl;
    const openMenu = (event) => {
      setAnchor(event.currentTarget);
    };
    const handleClose = () => {
      setAnchor(null);
    };
  
    //   const mappedCred = userAccounts.map((data) => {
    //    return data;
    //   })


    // 1. Filter the signed in user by email
    const filterSignedInUser = userAccounts.filter(data => {
        return data.email === checkUserMail
    })

    // 2. Filter the firstName using the signed in users email
        const filteredFirstName = filterSignedInUser.map(data => {
            return data.firstName.charAt(0).toUpperCase()
        })
        

     
     

    
    return (
    <Container>
        <Headercontainer>
            <Logodiv>
                <Logoimg src={logoicon}/>
            </Logodiv>
        <Linksdiv>
        <MessageDiv>
        <Badge badgeContent={4} color="primary">
        <MessageIcon fontSize="large" color="action" />
      </Badge>
        </MessageDiv>
        
        <Link style={{ textDecoration: 'none' }} to="/"><Links>Annonser</Links></Link>

          <Tooltip title="Account settings">
          <IconButton onClick={openMenu} size="small" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 40, height: 40 } }>{filteredFirstName}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        open={open}
        
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
            
          elevation: 0,
          sx: {
              
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profil
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Mitt Konto
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
            {}
          </ListItemIcon>
          Logga ut
        </MenuItem>
      </Menu>
        </Linksdiv>

        </Headercontainer>
        
        
       {/* <Searchdiv>
           <Searchbar input="text" placeholder="Sök på område..."></Searchbar>
           <SearchIcon style={{marginLeft:"-1.5em", fontSize:"2em", cursor:"pointer", zIndex:"2", color:"#395352"}} />
       </Searchdiv> */}
        
    </Container>
    
    )
}

export default Header
