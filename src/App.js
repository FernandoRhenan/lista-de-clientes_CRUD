import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./components/List";
import CommandBar from "./components/CommandBar";
import { useState } from 'react'

function App() {

  const [signal, setSignal] = useState(false)
  const [dataFromChosenLi, setDataFromChosenLi] = useState(false)
  const [random, setRandom] = useState(false);

  const [Az, setAz] = useState(true)

  function screenUp() {
    setSignal(!signal)
  }
  function chosenLi(e ,data){
    setDataFromChosenLi([e, data])
  }

  function cleanInput(){
    setRandom(Math.random()*1000)
  }

  function AZ(){
    setAz(true)
  }

  function ZA(){
    setAz(false)
  }

  return (
    <div>
      <Header text={'Lista de Clientes'} />
      <CommandBar screenUp={screenUp} chosenLi={chosenLi} random={random} AZ={AZ} ZA={ZA} />
      <List signal={signal} dataFromChosenLi={dataFromChosenLi} cleanInput={cleanInput} Az={Az} />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default App;
