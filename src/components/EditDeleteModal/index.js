import './editDeleteModal.css'
import '../Form/form.css'
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { BiX, BiTrash, BiPencil, BiCheck } from "react-icons/bi";

function EditDeleteModal({ deleteClient, closeModal, chosenItem }) {

    const [openInput, setOpenInput] = useState(false);
    const [changer, setChanger] = useState(false);

    const [positionX, setPositionX] = useState(null)
    const [positionY, setPositionY] = useState(null)

    const [changedNome, setChangedNome] = useState('')
    const [changedEmail, setChangedEmail] = useState('')
    const [changedTelefone, setChangedTelefone] = useState('')

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')

    useEffect(() => {
        if (changedNome && changedEmail && changedTelefone) {
            setChanger(true)
        } else {
            setChanger(false)
        }
    }, [changedNome, changedEmail, changedTelefone])

    useEffect(() => {
        setPositionX(JSON.parse(chosenItem)[1])
        setPositionY(JSON.parse(chosenItem)[2])

        JSON.parse(chosenItem)[0].forEach(e => {
            setNome(e.nome)
            setEmail(e.email)
            setTelefone(e.telefone)
        });

    }, [chosenItem])

    function changeItem() {
        let objChosenItem = JSON.parse(chosenItem)[0][0];

        let listOfClients = JSON.parse(localStorage.getItem('listOfClients'));
        let newListOfClients = listOfClients.filter((item) => {
            return item.id !== objChosenItem.id
        })

        newListOfClients.push({
            nome: changedNome,
            email: changedEmail,
            telefone: changedTelefone,
            id: objChosenItem.id
        })

        localStorage.setItem('listOfClients', JSON.stringify(newListOfClients));
        toast.success('Cliente editado com sucesso!')
        closeModal()
    }

    return (
        <div className='block'>
            <div className="container-editDelete" style={{ top: positionY, left: positionX }}>
                <div className="container-editDelete-btn">
                    <span>
                        <BiPencil onClick={() => {
                            setOpenInput(!openInput)
                        }} />
                    </span>
                    <span>
                        <BiTrash onClick={deleteClient} />
                    </span>
                    <span>
                        {changer && <BiCheck className='check' onClick={changeItem} />}
                        {!changer && <BiX className='x' onClick={closeModal} />}
                    </span>
                </div>
                {!openInput &&
                    <div className="container-editDelete-obj">
                        <span><b>Nome:</b> {nome}</span>
                        <span><b>Email:</b> {email}</span>
                        <span><b>Telefone:</b> {telefone}</span>
                    </div>
                }
                {openInput &&
                    <div className="container-editDelete-obj">
                        <label>{nome}
                            <input onChange={(e) => { setChangedNome(e.target.value) }} placeholder='Insira o novo nome...' type='text' value={changedNome} />
                        </label>
                        <label>{email}
                            <input onChange={(e) => { setChangedEmail(e.target.value) }} placeholder='Insira o novo email...' type='email' value={changedEmail} />
                        </label>
                        <label>{telefone}
                            <input onChange={(e) => { setChangedTelefone(e.target.value) }} placeholder='Insira o novo telefone...' type='number' value={changedTelefone} />
                        </label>
                    </div>
                }

            </div>
        </div>
    )
}

export default EditDeleteModal