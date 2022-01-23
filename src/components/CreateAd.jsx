import React, { useState, useContext } from "react";
import styled from "styled-components";
import device from "../styles/mediaqueries";
import Header from "./Header";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import {Context} from "../ContextProvider"
import Cities from "../Cities.json"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useHistory} from "react-router-dom";
import bgpic from "../styles/obstacle1.jpg"

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: ${device.primaryFont};
 
`;

const Privbotext = styled.h1`
  color: #333;
  font-weight: 600;
  font-size: 2.5em;
  
  margin: 0;
  padding: 0;
  margin-top:0.5em;
  text-align: center;
  @media${device.tablet} {
    font-size: 1.9em;
    margin-top: 0.4em;
  }
`;

const Form = styled.form`
  margin-top: 1.5em;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  max-width:350px;

  @media${device.tablet} {
    width: auto;
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
  font-weight:500;
  position:relative;
`;

const Backarrow = styled.div`
position:absolute;
left:10px;
display: flex;
align-items: center;

`

const Bgcontainer = styled.div`
 background-image:url(${bgpic}) no-repeat fixed;
 background-position:left center; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
width:100%;
display:flex;
justify-content: center;
align-items:center;
flex-direction:column;

`

const TopText = styled.div`
display: flex;
width:100%;
justify-content: center;
align-items:center;
`

const RadioInput = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  margin-top: 0.3em;
`;


function CreateAd() {
  const {addDoc, collectionRef, serverTimestamp, userAccounts, messagesRef, checkUserMail} = useContext(Context)
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState()
  const [number, setNumber] = useState()
  const [rent, setMaxRent] = useState()
  const [yearlyPay, setYearlyPay] = useState()
  const [inArea, setlookingInArea] = useState("")
  const [imgLink, setImglink] = useState("")
  const [desc, setDesc] = useState("")
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState();
  const [pets, hasPets] = useState();
  const [testage, settestage] = useState("")
  const [testCity, setTestCity] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  
  function addNewAd(){
    
    try{
      if(desc !== "" && testCity !== ""){
    addDoc(collectionRef,{
        firstName: firstNameLoggedIn,
        lastName: lastNameLoggedIn,
        email: emailLoggedIn,
        age: ageLoggedIn,
        phoneNumber:number,
        maxRent:rent,
        yearlySalary:yearlyPay,
        lookingInArea:testCity,
        profilePicture:imgLink,
        description:desc,
        gender:gender,
        smoker:smoking,
        hasPets:pets,
        createdAt: serverTimestamp()
    } )
    setSuccessMessage("Annons upplagd!")
  }
  else{
    console.log("Error fel i inputen")
  }

  }
  catch(err){
    console.log(err.message)
    setSuccessMessage(err.message)
  }
}

const checkedCredentials = userAccounts.filter((data) => {
  return data.email === checkUserMail
  
})

let firstNameLoggedIn = null;
let lastNameLoggedIn = null;
let ageLoggedIn = null;
let emailLoggedIn = null;

const mappedCred = checkedCredentials.map((data) => {
 firstNameLoggedIn = data.firstName
 lastNameLoggedIn = data.lastName
  ageLoggedIn = data.age
  emailLoggedIn = data.email
})

const history = useHistory()

  return (
    <Container>
      
      <Header />
      <Topline>
      <Backarrow>
        <ArrowBackIcon onClick={history.goBack} style={{fontSize:"2em", cursor:"pointer"}}/>
        </Backarrow>
        
        <TopText>
        Privbo
        </TopText>

        </Topline>
        <Bgcontainer>
      <Privbotext>Lägg in ny annons</Privbotext>
      
      <Form
        onSubmit={(e) => {
          e.preventDefault();
            addNewAd();
        }}
      >
        {/* <TextField
          id="outlined-basic"
          label="Namn"
          margin="normal"
          value={`${firstName.}`}
          onChange={(e) => setfirstName(e.target.value)}
          type="text"
          required
          inputProps={{ maxLength: 25, minLength: 2 }}
          fullWidth
          variant="outlined"
        /> */}
        {/* <TextField
          id="outlined-basic"
          label="Efternamn"
          value={`${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}
          onChange={(e) => setlastName(e.target.value)}
          margin="normal"
          required
          inputProps={{ maxLength: 30, minLength: 2 }}
          fullWidth
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ maxLength: 25, minLength: 2 }}
          type="email"
          margin="normal"
          required
          fullWidth
          variant="outlined"
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
          fullWidth
          variant="outlined"
        /> */}


        <TextField
          id="outlined-basic"
          label="Telefon"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          margin="normal"
          inputProps={{ minLength: 8, maxLength: 15 }}
          required
          type="number"
          fullWidth
          style={{opacity:"1"}}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Maxhyra i SEK"
          value={rent}
          onChange={(e) => setMaxRent(e.target.value)}
          margin="normal"
          inputProps={{ max: 100000, min: 1 }}
          required
          type="number"
          fullWidth
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Årslön"
          value={yearlyPay}
          onChange={(e) => setYearlyPay(e.target.value)}
          margin="normal"
          inputProps={{ min: 1 }}
          required
          type="number"
          fullWidth
          variant="outlined"
        />
        
        <Autocomplete
      disablePortal
      id="combo-box-demo"
      
      options={Cities}
      value={testCity}
      onChange={(event, newValue) => {
        setTestCity(newValue)
      }}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Kommun" fullWidth margin="normal"/>}
    />
    
        <TextField
          id="outlined-basic"
          label="Länk till bild på dig själv, https://"
          value={imgLink}
          onChange={(e) => setImglink(e.target.value)}
          margin="normal"
          type="url"
          required
          inputProps={{ minLength: 5 }}
          fullWidth
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          fullWidth
          required
          margin="normal"
          value={`${desc.charAt(0).toUpperCase() + desc.slice(1)}`}
          onChange={(e) => setDesc(e.target.value)}
          label="Berätta om dig själv för hyresvärdarna."
          multiline
          rows={4}
          inputProps={{minLength: 50 }}
        />

        <RadioInput>
          <p
            style={{
              fontSize: "1.5em",
              margin: "0",
              marginLeft: "0.2em",
              marginBottom: "0.2em",
              padding: "0",
            }}
          >
            Kön
          </p>
          <label htmlFor="gender1">
            <input
              type="radio"
              id="gender1"
              name="gender"
              required
              checked={gender === "Man"}
              onChange={() => setGender("Man")}
            />
            Man
          </label>
          <label style={{ marginTop: "0.3em" }} for="gender2">
            <input
              type="radio"
              id="gender2"
              name="gender"
              required
              checked={gender === "Kvinna"}
              onChange={() => setGender("Kvinna")}
            />
            Kvinna
          </label>
        </RadioInput>

        <RadioInput>
          <p
            style={{
              fontSize: "1.5em",
              margin: "0",
              marginLeft: "0.2em",
              marginBottom: "0.2em",
              padding: "0",
            }}
          >
            Rökare
          </p>
          <label htmlFor="smoker1">
            <input
              type="radio"
              id="smoker1"
              name="smoker"
              required
              checked={smoking === true}
              onChange={() => setSmoking(true)}
            />
            Ja
          </label>
          <label style={{ marginTop: "0.3em" }} for="smoker2">
            <input
              type="radio"
              id="smoker2"
              name="smoker"
              required
              checked={smoking === false}
              onChange={() => setSmoking(false)}
            />
            Nej
          </label>
        </RadioInput>

        <RadioInput>
          <p
            style={{
              fontSize: "1.5em",
              margin: "0",
              marginLeft: "0.2em",
              marginBottom: "0.2em",
              padding: "0",
            }}
          >
            Husdjur
          </p>
          <label htmlFor="haspets1">
            <input
              type="radio"
              id="haspets1"
              name="pets"
              required
              checked={pets === true}
              onChange={() => hasPets(true)}
            />
            Ja
          </label>
          <label style={{ marginTop: "0.3em" }} for="haspets2">
            <input
              type="radio"
              id="haspets2"
              name="pets"
              required
              checked={pets === false}
              onChange={() => hasPets(false)}
            />
            Nej
          </label>
        </RadioInput>
            {successMessage &&<p style={{padding:"0", margin:"0", marginTop:"0.5em", color:"#2e7d32"}}>{successMessage}</p>}
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            marginTop: "1em",
            marginBottom: "1em",
            padding: "0.9em",
            width: "280px",
          }}
          color="success"
        >
          Lägg till annons
        </Button>
      </Form>


      </Bgcontainer>
    </Container>
  );
}

export default CreateAd;
