// 400 x 150
import mainLogo from "../images/MainLogo.png"

//240 x 160
import minimalLogo from "../images/MinimalLogo.png"

//360 x 120
import HomeLogo from '../images/RealHomeLogo.png'


const Nav = ({ minimal, setShowModal, showModal, setIsSignUp, authToken}) => {

    const displayModal = () => {
        setShowModal(true);
        setIsSignUp(false);
    }
    
    return (

        <nav>
            <div className="logo-container">
                <img className="logo" src={minimalLogo}></img>
            </div>
            {!minimal &&
                <h1 className='primary-title'>Song Central</h1>
            }
            {!authToken && !minimal &&
                <button 
                    className="nav-button"
                    onClick={displayModal}
                    disabled={showModal}
                >Log In</button>
            }
            
        </nav>
    );
}
export default Nav
