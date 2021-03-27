import React from 'react'

// React.useEffect(()=> {
//   fetch("/api/sayHello").then(res => res.json()).then(json => console.log(json));
// },[])

const App = () => {
  const [ hello, setHello ] = React.useState("")

  React.useEffect(()=> {
    console.log("useEffect")
    fetch("/api").then(res => res.json()).then(json => setHello(json.data));
  },[])
  
  return (
    <div>
          {hello}
    </div>
  );
}

export default App;
