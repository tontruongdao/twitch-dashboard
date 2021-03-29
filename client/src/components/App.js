import React from 'react'

const App = () => {

  // React States
  const [ loading, setLoading ] = React.useState(false)
  const [ games, setGames ] = React.useState("")
  const [ chessData, setChessData ] = React.useState("")
  
  // Game Data
  let dotaData = null;
  let heartData = null
  let rocketData = null


  // React useEffect to fetch data on API
  React.useEffect(() => {
    // console.log("useEffect")
    setLoading(true)
    fetch("/api/views")
      .then(res => res.json())
        .then(json => {
          setGames(json);

          setChessData(games[0])
          setLoading(false)
        })
    //  console.log(games) 
  },[])

  // Updating game data
  // if (games) {
  //   console.log(chess, dotaData, heartData, rocketData)
  // }

  if(loading){
    console.log(`loading ${games}`)
  }

  return (
    <div>
      <h1> Truong Dashboard Project</h1>
      {!loading && games ? (
      <div> game name: {games[0].name}</div> 
      ) : (
      <div>Loading...</div>
      )}

    </div>
  );
}

export default App;
