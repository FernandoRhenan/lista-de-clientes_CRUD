import './buttons.css'

function Buttons({ x, y, childToParent, registerClient }) {

    return (
        <div className='buttons'>
            <button onClick={(e) => {
                childToParent(e, x)
                registerClient(e)
            }}>{x}
            </button>
            <button onClick={(e) => { childToParent(e, y) }}>{y}</button>
        </div>
    )
}

export default Buttons