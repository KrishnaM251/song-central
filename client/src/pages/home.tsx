import Nav from '../components/Nav.tsx';
import AuthModal from '../components/AuthModal.tsx';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import FadeIn from 'react-fade-in';

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies()

    const authToken = cookies.AuthToken;

    const handleClick = () => {
        setShowModal(true);
        setIsSignUp(true);
    }

    if(authToken) {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
        return
    }

    return (
        <div className='overlay'>
            <Nav 
            authToken={authToken}
            minimal={false}
            setShowModal={setShowModal} 
            showModal={showModal} 
            setIsSignUp={setIsSignUp}
            />
            <div className="home">
                
                
                <FadeIn delay={1000} transitionDuration={2000}>
                    <h2 className='subtitle'>Reach for the sky.</h2>
                    <button className="primary-button" onClick={handleClick}>
                        {authToken ? "Signout" : "Create Account"}
                    </button>
                </FadeIn>
                {showModal && (
                    <AuthModal 
                        setShowModal={setShowModal} 
                        isSignUp={isSignUp}/>
                )}
            </div>
        </div>       
    );
}
export default Home