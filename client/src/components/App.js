import React from 'react'
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://truong-twitch-dashboard.herokuapp.com/http://localhost:4000";


const App = () => {

  // React States
  const [ loading, setLoading ] = React.useState(false)
  const [ games, setGames ] = React.useState("")

  const [response, setResponse] = React.useState("");

  
  // Game Data
  let chessData = null
  let dotaData = null;
  let heartData = null
  let rocketData = null


  // React useEffect to fetch data on API
  React.useEffect(() => {

    // setLoading(true)
    // fetch("/api/views")
    //   .then(res => res.json())
    //     .then(json => {
    //       setGames(json);
    //       setLoading(false)
    //     })

    // Socket
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    return () => socket.disconnect();

  },[])

  if(games){
    console.log(`games ${games}`)
    const findChess = games.find( game => game.id === "743" )
    chessData = findChess
    const findDota = games.find( game => game.id === "29595" )
    dotaData = findDota
    const findHeart = games.find( game => game.id === "138585" )
    heartData = findHeart
    const findRocket= games.find( game => game.id === "30921" )
    rocketData = findRocket
  }

  console.log(response)

  return (
    <div>
      <h1> Truong Dashboard Project</h1>
      {!loading && games ? (
        <div>
        {/* Socket */}
        <div>
          <h2>Socket Data</h2>
          <div>
            <div>{chessData.name}</div>
            <div>Views: <span>{chessData.total_views}</span></div>
          </div>
        </div>
        {/* Victory */}
        <div>
          <h3> Line Chart </h3>
          <div>
            <div>{dotaData.name}</div>
            <div>Views: <span>{dotaData.total_views}</span></div>
            <div>{heartData.name}</div>
            <div>Views: <span>{heartData.total_views}</span></div>
            <div>{rocketData.name}</div>
            <div>Views: <span>{rocketData.total_views}</span></div>
          </div>
        </div>
      </div>
      ) : (
      <div>
                  It's <time dateTime={response}>{response}</time>
      </div>
      )}

    </div>
  );
}

export default App;
