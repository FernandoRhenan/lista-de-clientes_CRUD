import './header.css'

function Header({text}) {
    return (
        <div className='container-header'>
            <h1>{text}</h1>
        </div>
    )
}

export default Header