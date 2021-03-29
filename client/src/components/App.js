import React from 'react'

// React.useEffect(()=> {
//   fetch("/api/sayHello").then(res => res.json()).then(json => console.log(json));
// },[])

const App = () => {

  // React States
  const [ loading, setLoading ] = React.useState(false)
  const [ games, setGames ] = React.useState([])
  
  // Game Data
  let chessData = null;
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
          setLoading(false)
        });
  },[])

  // Updating game data
  if (games) {
    chessData = games.find(game => game.id === "743")
    dotaData = games.find(game => game.id === "30921")
    heartData = games.find(game => game.id === "138585")
    rocketData = games.find(game => game.id === "30921")
    console.log(chessData, dotaData, heartData, rocketData)
  }

  return (
    <div>
      <h1> Truong Dashboard Project</h1>
      {!loading ? (
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
      <div>Loading...</div>
      )}

    </div>
  );
}

export default App;
