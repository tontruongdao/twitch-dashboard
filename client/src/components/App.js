import React from 'react'
import socketIOClient from "socket.io-client";

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

  // ##########       React useEffect to fetch data on API
  React.useEffect(() => {

    setLoading(true)

    //  ##########    Socket
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI",data => {
      setGames(data)
      setLoading(false)
    });
    return () => socket.disconnect();
  },[])

  return (
    <div>
      <h1> Truong Dashboard Project</h1>
      {!loading ? (
        <>
          <ChessSocket data={games}/>
          <Chart data={games} />
        </>
      ) : (
      <div>
        <Spinner/>
      </div>
      )}

    </div>
  );
}

export default App;
