import React, {useState, useContext, useEffect} from 'react'
import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import device from "../styles/mediaqueries";
import { Autocomplete } from '@mui/material';
import Cities from "../Cities.json"
import { TextField } from '@mui/material';
import { Context } from "../ContextProvider"

const Searchdiv = styled.div`
width:100%;
margin-top:2em;
display: flex;
justify-content: center;
align-items:center;

@media${device.mobileL}{
  width:95%;
}
`

const Searchbar = styled.input`
padding:20px 25px;
width:80%;
outline:none;
border-radius:10px;
border:none;
opacity:0.7;
max-width:800px;
font-size:1.2em;

&:focus {
    border-color: #fa7fb2;
  }

  ::placeholder {
    font-size: 1.2em;
    color: #333;
  }

@media${device.tablet}{
    max-width:90%;
}
`



function SearchBar() {
  
  const {citySearchFunction,searchArea, setSearchArea, fetchDb, filteredData, setFilteredData, userData } = useContext(Context)


  function cookieFilter(){
    const cookie = sessionStorage.getItem("filteredCity")
    if(!cookie){
        sessionStorage.setItem("filteredCity", JSON.stringify(searchArea))
    }
    else{
        const cookieExists = JSON.parse(sessionStorage.getItem("filteredCity"))
        setSearchArea(cookieExists)
    }
}

const searchCookie = JSON.parse(sessionStorage.getItem("filteredCity"))

function runSearch(e){
  if(e.key === "Enter" && e.target.value.length > 0){
    citySearchFunction(searchArea)
    
  }
  // else if(testvalue === ""){
  //   setFilteredData(userData)
    
  // }
}



const [testvalue, settestvalue] = useState("")

useEffect(() => {
 cookieFilter()
  
}, [])

useEffect(() => {
  if(testvalue === ""){
    setFilteredData(userData)
  }
}, [testvalue])

useEffect(() => {
if(searchCookie){

  return filteredData.filter(data => {
    return data.lookingInArea === searchCookie
  })
}
}, [])
  

    return (
        <Searchdiv>
          
          <Autocomplete
        freeSolo
        id="searchSolo"
        style={{padding:"20px 25px", width:"80%", outline:"none", maxWidth:"600px", }}
        disableClearable
        options={Cities}
        value={searchArea}
        key={false}
      onChange={(event, newValue) => {
        setSearchArea(newValue)
      }}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{fontSize:"1.2em"}}
            label="Sök på område..."
            onKeyUp={runSearch}
            onChange={(e) => settestvalue(e.target.value)}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />




           {/* <Searchbar input="text" placeholder="Sök på område..."></Searchbar> */}
           <SearchIcon style={{marginLeft:"-0.6em", padding:"0", fontSize:"2em", cursor:"pointer", zIndex:"2", color:"#395352"}} />
       </Searchdiv>
       
    )
}

export default SearchBar
