import React from 'react'
import socketIOClient from "socket.io-client";
import styled, { ThemeProvider } from 'styled-components';

import { theme } from './THEMES'

import Spinner from './Spinner'
import ChessSocket from './ChessSocket'
import Chart from './Chart'

// ##########        Snippet for Heroku Deploy to work with Socket
let ENDPOINT = "http://localhost:4000";

if (process.env.NODE_ENV === 'production') {
  ENDPOINT = "https://truong-twitch-dashboard.herokuapp.com";
} 


const App = () => {

  // ##########       React States
  const [ loading, setLoading ] = React.useState(false)
  const [ games, setGames ] = React.useState([])
  const [ time, setTime ] = React.useState('')

  // ##########       React useEffect to fetch data on API
  React.useEffect(() => {

    setLoading(true)
    //  ##########    Socket
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI",data => {
      const newTime = new Date().toString()
      setTime(newTime)
      setGames(data)
      setLoading(false)
    });
    return () => socket.disconnect();
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header> Truong Dashboard Project</Header>
        {!loading ? (
        <Container>
          <FirstSection>
            <ChessSocket data={games}/>
            <Chart data={games} />
          </FirstSection>
          <Time>Last update on: {time}</Time>
        </Container>
        ) : (
        <div>
          <Spinner/>
        </div>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div `
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  height: 90vh;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 1rem 1rem ${theme.primaryLight};
`

const Header = styled.h1`
  color: ${theme.primaryDark};
  padding: 3vh 2vw;
  font-size: 3rem;
  letter-spacing: 5px;
  text-align: center;
  flex:1;
  font-family: 'Orbitron', sans-serif;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex:9;
`

const FirstSection = styled.div`
  display: flex;
  padding: 2vh 2vw;
  flex-direction: row;
  flex: 2;
  margin: 3vh 3vw;
  padding-top: 3vh;
  background-color: ${theme.orimaryLight};
`

const Time = styled.div`
  padding-top: 10vh;
  color: grey;
  font-size: 0.9rem;
  flex:1;
`

export default App;
