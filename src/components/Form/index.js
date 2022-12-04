import './form.css';
import Buttons from '../Buttons';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

function Form({ childToParent, screenUp }) {

    const [client, setClient] = useState({}) 


    function registerClient(e) {
        e.preventDefault()

        if (nome !== "" && email !== "" && telefone !== "") {

            let arrayLS = JSON.parse(localStorage.getItem('listOfClients'))
            arrayLS.push(client)
            toast.success("Cliente adicionado!");
            screenUp()
            localStorage.setItem('listOfClients', JSON.stringify(arrayLS))
        } else {
            toast.error("Preencha todos os campos!");
        }

    }

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    useEffect(() => {

        let id = Math.floor(Math.random() * 100000000000)

        setClient({
            nome: nome,
            email: email,
            telefone: telefone,
            id: id
        })
    }, [nome, email, telefone])


    return (
        <div className='block'>
            <div className='container-form'>
                <form>
                    <div>
                        <label>Nome:
                            <input onChange={(e) => { setNome(e.target.value) }} maxLength='30' type='text'></input>
                        </label>
                        <label>Email:
                            <input onChange={(e) => { setEmail(e.target.value) }} maxLength='30' type='email'></input>
                        </label>
                        <label>Telefone:
                            <input onChange={(e) => { setTelefone(e.target.value) }} maxLength='15' type='number'></input>
                        </label>
                    </div>

                    <Buttons x='Cadastrar' y='Cancelar' childToParent={childToParent} registerClient={registerClient} />

                </form>
            </div>
        </div>
    )
}

export default Form