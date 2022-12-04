import './filtredList.css'
import Message from '../Message'


function FiltredList({ filtredItem, chosenLi }) {
    return (
        <div className='container-filtredList'>
            {filtredItem == !filtredItem &&
                <Message message={'Cliente não encontrado'} />
            }
            <ul>
                {filtredItem.map((item) => (
                    <li onClick={(e) => { chosenLi(e, item.id) }} key={item.id} ><span>{item.nome}</span><span>{item.email}</span>{item.telefone}</li>
                ))}
            </ul>
        </div>
    )
}

export default FiltredList
