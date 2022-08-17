import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const AuthModal = ( { setShowModal, isSignUp }) => {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [confirmPassword, setConfirmPassword] = useState<String>('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookies] = useCookies();

    let navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async(e) => {
        // prevents screen from refreshing when submitting form
        e.preventDefault()

        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })


            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)
            
            const success = response.status === 201

            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}>⮾</div>
            <h2>{isSignUp? 'SIGN UP' : 'SIGN IN'}</h2>
            <p>By clicking SUBMIT, you agree to our Terms and Conditions.</p>
            <form onSubmit={handleSubmit} className='auth-modal-form'>
                <input
                    className='auth-modal-input'
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='auth-modal-input'
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                { isSignUp && <input
                    className='auth-modal-input'
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            <hr/>
            <h2>DOWNLOAD THE APP</h2>

        </div>
    );
}
export default AuthModal