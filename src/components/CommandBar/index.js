import './commandBar.css'
import Form from '../Form'
import FiltredList from '../FiltredList';
import { useEffect, useState } from 'react';
import { BiSearch, BiPlusCircle, BiSortDown, BiSortUp } from "react-icons/bi";


function CommandBar({ screenUp, chosenLi, random, AZ, ZA }) {
    const [addMode, setAddMode] = useState(false);
    const [filtredItem, setFiltredItem] = useState([])
    const [inp, setInp] = useState('');
    const [inpValue, setInpValue] = useState('');
    useEffect(() => {
        setInpValue('')
        setInp('')
    }, [random])
    const childToParent = (e, childdata) => {
        e.preventDefault()
        closeOrOpenModal(childdata)
    }
    function closeOrOpenModal(childdata) {
        if (addMode === false) {
            setAddMode(true)
        }
        if (childdata === 'Cancelar') {
            setAddMode(false)
        }
        if (childdata === 'Cadastrar') {
            setAddMode(false)
        }
    }
    function findClient(e) {
        let wantedItem = e.target.value;
        setInp(wantedItem);
        let listOfClients = JSON.parse(localStorage.getItem('listOfClients'))
        let newListOfClients = listOfClients.filter((item) => {
            return item.nome.includes(wantedItem)
        })
        setFiltredItem(newListOfClients)
    }

    return (
        <>
            <div className='bar'>
                <span>
                    <BiPlusCircle onClick={closeOrOpenModal} />
                </span>
                <span>
                    <div>
                        <BiSearch />
                        <input onChange={(e) => {
                            findClient(e)
                            setInpValue(e.target.value)
                        }} value={inpValue} className='input-bar' type='text' placeholder='Buscar nome...' />
                    </div>
                </span>
                <span>
                    <BiSortDown onClick={AZ} />
                </span>
                <span>
                    <BiSortUp onClick={ZA} />
                </span>

            </div>

            <div className='container-commandBar'>
                <span>Nome</span><span>Email</span>Telefone
            </div>

            {inp !== "" &&
                <FiltredList filtredItem={filtredItem} chosenLi={chosenLi} random={random} />
            }

            {addMode &&
                <Form childToParent={childToParent} screenUp={screenUp} />
            }
        </>
    )
}

export default CommandBar