import axios from 'axios';
import { useState } from 'react';

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUsersMessages}) => {
    
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userID: userId,
            to_userID: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='chat-input'> 
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className='secondary-button' onClick={addMessage}>Submit</button>
        </div>
        
    );
}

export default ChatInput