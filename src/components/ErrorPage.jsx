import React from 'react'
import styled from "styled-components"

const Container = styled.div`
width:100%;
height:100%;
`

const Bgimage = styled.img`
object-fit:contain;
`

function ErrorPage() {
    return (
       <Container>
           <Bgimage src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"/>
       </Container>
    )
}

export default ErrorPage
