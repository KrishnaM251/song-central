import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const ChatHeader = ({ user }) => {

    let navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();

    const logout = () => {
        removeCookies('UserId', cookies.UserId)
        removeCookies('AuthToken', cookies.AuthToken)
        navigate('/') 
        window.location.reload()
    }

    return (
        <div className='chat-container-header'>
            <div className='profile'>
                <div className='image-container'>
                    <img src={user.url} alt={'photo of ' + user.professional_name}/>
                </div>
                <h3>{user.professional_name}</h3>
            </div>
            <i className='log-out-icon' onClick={logout}>🠜</i> 
        </div>
        
    );
}

export default ChatHeader