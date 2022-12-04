import './list.css'
import { useEffect, useState } from 'react'
import EditDeleteModal from '../EditDeleteModal'
import { toast } from "react-toastify";

function List({ signal, dataFromChosenLi, cleanInput, Az }) {

  const [chosenItem, setChosenItem] = useState([])
  const [editDeleteMode, setEditDeleteMode] = useState(false);
  const [az, setAz] = useState(Az)

  if (!localStorage.getItem('listOfClients')) {
    localStorage.setItem('listOfClients', JSON.stringify([]))
  }

  useEffect(() => {
    if (dataFromChosenLi) {
      chosenLi(dataFromChosenLi[0], dataFromChosenLi[1])
    }
  }, [dataFromChosenLi])

  useEffect(() => {
    setAz(Az)
  }, [Az])


  function closeModal() {
    setEditDeleteMode(false)
    cleanInput()
  }


  function getItem() {
    let listOfClients = JSON.parse(localStorage.getItem('listOfClients'))

    if(az){
    listOfClients.sort((a,b)=>{
     if(a.nome < b.nome) return -1;
     else return 1
    })
  }else{
    listOfClients.sort((a,b)=>{
      if(a.nome > b.nome) return -1;
      else return 1
     })
  }
    return listOfClients
  }

  function deleteClient() {
    let objChosenItem = JSON.parse(chosenItem)[0][0];

    let listOfClients = JSON.parse(localStorage.getItem('listOfClients'));
    let newListOfClients = listOfClients.filter((item) => {
      return item.id !== objChosenItem.id
    })

    localStorage.setItem('listOfClients', JSON.stringify(newListOfClients));
    toast.success('Cliente removido!')
    closeModal()
  }

  useEffect(() => {
    getItem(true)
  }, [signal])

  function chosenLi(e, id) {

    let [positionX, positionY] = [e.pageX, e.pageY]

    let list = JSON.parse(localStorage.getItem('listOfClients'))
    let listItem = list.filter((item) => {
      return item.id === id
    })

    setChosenItem(JSON.stringify([listItem, positionX, positionY]))

    setEditDeleteMode(true)
  }


  return (
    <div className='container-list'>

      {editDeleteMode &&
        <EditDeleteModal deleteClient={deleteClient} chosenItem={chosenItem} closeModal={closeModal} />}

        <ul>
          {getItem(true).map((item) => (
            <li onClick={(e) => { chosenLi(e, item.id) }} key={item.id} ><span>{item.nome[0].toUpperCase() + item.nome.slice(1)}</span><span>{item.email}</span>{item.telefone}</li>
          ))}
        </ul>
    </div>
  )
}

export default List