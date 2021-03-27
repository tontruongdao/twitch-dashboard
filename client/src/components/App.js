import React from 'react'

// React.useEffect(()=> {
//   fetch("/api/sayHello").then(res => res.json()).then(json => console.log(json));
// },[])

const App = () => {
  const [ chess, setChess ] = React.useState("")

  React.useEffect(()=> {
    console.log("useEffect")
    fetch("/api/stream/743").then(res => res.json()).then(json => setChess(json.game));
  },[])
  
  return (
    <div>
          {chess}
    </div>
  );
}

export default App;
