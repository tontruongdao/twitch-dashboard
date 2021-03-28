import React from 'react'

// React.useEffect(()=> {
//   fetch("/api/sayHello").then(res => res.json()).then(json => console.log(json));
// },[])

const App = () => {
  const [ chess, setChess ] = React.useState("")

  React.useEffect(()=> {
    console.log("useEffect")
    fetch("/api/views").then(res => res.json()).then(json => console.log(json));
  },[])
  
  return (
    <div>
          hello{chess}
    </div>
  );
}

export default App;
