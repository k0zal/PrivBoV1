import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { Context } from "../ContextProvider";
import { TextField } from "@mui/material";
import { flexbox } from "@mui/system";
import device from "../styles/mediaqueries";
import { Button } from "@mui/material";

const Container = styled.div``;

const Para = styled.p`
  font-family: ${device.primaryFont};
  text-align: center;
  font-size: 1.5em;
  margin: 0;
  padding: 0;
`;
const mediaInjection = window.matchMedia("(max-width: 768px)");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  height: 300,
  bgcolor: "#5666f2",
  borderRadius: "3px",
  color: "white",
  boxShadow: 24,
  paddingRight: "5em",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  p: 4,
};

const Buttondiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.7em;
`;



function Modalhandler({sendToMail, focusBool}) {
  const [theMessage, setTheMessage] = useState("");
  const [senderFirstName, setSenderFirstName] = useState("")
  const { modalState, setModalState, addDoc, messagesRef, serverTimestamp, checkUserMail, userAccounts, userMessages} =
    useContext(Context);

  //   const senderName = userData.find(data => {
  //     return data.id === id
  // })

const allMessages = userMessages.map(data => {
  return data;
})

console.log(allMessages)

const filterLoggedInUser = userAccounts.filter(data => {
  return data.email === checkUserMail
})


console.log("sändarens email: ", checkUserMail)
console.log("mottagarens email", sendToMail)

console.log("focusbool is: ", focusBool)



const filteredData = filterLoggedInUser.map(data => {
  return data;
})


// console.log(filteredData[0].firstName)

  function sendMessage(){
    try{
    addDoc(messagesRef, {
      messages: theMessage,
      recipientEmail:sendToMail,
      senderEmail: checkUserMail,
      senderFirstName: filteredData[0].firstName,
      messageSentAt: serverTimestamp(),
    });
 
  }
  catch(e){
    console.log(e.message)
  }
  }

  console.log(theMessage)
  console.log(senderFirstName)

  const modalMessageRef = useRef(modalState)

  // useEffect(() => {
  //   if(modalState){
  //     modalMessageRef.current.focus()
  //   }
  // }, [modalState])


  return (
    <div>
      <Modal
      
        open={modalState}
        onClose={() => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <Box sx={style}>
          <Para>Skicka meddelande</Para>
          <TextField
            inputRef={modalMessageRef}
            id="outlined-multiline-static"
            label="Meddelande"
            multiline
            rows={5}
            onChange={(e) => setTheMessage(e.target.value)}
            color="primary"
            sx={{
              bgcolor: "white",
              marginTop: "1.1em",
              display: "flex",
              width: "290px",
              borderRadius: "4px",
            }}
          />
          <Buttondiv>
            <Button
            onClick={() => {sendMessage(); setModalState(false)}}
              style={{ width: "90%" }}
              variant="contained"
              color="success"
            >
              SKICKA
            </Button>
          </Buttondiv>
        </Box>
      </Modal>
    </div>
  );
}

export default Modalhandler;
