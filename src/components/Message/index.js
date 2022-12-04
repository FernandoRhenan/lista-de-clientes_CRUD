import './message.css'

function Message({message}){
    return(
        <div className='container-message'>
            <span>{message}</span>
        </div>
    )
}

export default Message