import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from './Header'
import device from '../styles/mediaqueries'

const Container = styled.div`
width:100%;
margin:0;
padding:0;
font-family:${device.primaryFont};
`

const Maintext = styled.h1`
margin-left:0.5em;
color:#333;

`

function Messages() {

    return (
        <Container>
            <Header/>
<Maintext>Meddelanden</Maintext>

        </Container>
    )
}

export default Messages
