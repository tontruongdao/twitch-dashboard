import React from 'react'
import socketIOClient from "socket.io-client";

let ENDPOINT = "http://localhost:4000";

if (process.env.NODE_ENV === 'production') {
  ENDPOINT = "https://truong-twitch-dashboard.herokuapp.com";
} 



const App = () => {

  // React States
  const [ loading, setLoading ] = React.useState(false)
  const [ games, setGames ] = React.useState("")



  // React useEffect to fetch data on API
  React.useEffect(() => {

    setLoading(true)
    // fetch("/api/views")
    //   .then(res => res.json())
    //     .then(json => {
    //       setGames(json);
    //       setLoading(false)
    //     })

    // Socket
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      // setResponse(data);
      console.log(data)
      setGames(data)
      // console.log(response)
    });
    console.log(games)
    setLoading(false)
    return () => socket.disconnect();
  },[])

  // Variables
  let chess;

  if(games){
    console.log(`game loaded are ${games}`)
    chess = games[0]
    console.log (`The chess variable is ${chess.name}`)
  }

  return (
    <div>
      <h1> Truong Dashboard Project</h1>
      {!loading && games ? (
        <div>
        {/* Socket */}
        <div>
          <h2>Socket Data</h2>
          <div>Name:{chess.name}</div>
          <div>Views:{chess.total_views}</div>
        </div>
        {/* Victory */}
        <div>
          <h3> Line Chart </h3>
        </div>
      </div>
      ) : (
      <div>
                  It's loading
      </div>
      )}

    </div>
  );
}

export default App;
