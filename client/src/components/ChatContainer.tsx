import { useState } from 'react';
import ChatHeader from './ChatHeader.tsx';
import MatchesDisplay from './MatchesDisplay.tsx';
import ChatDisplay from './ChatDisplay.tsx';

const ChatContainer = ({ user }) => {

    const [clickedUser, setClickedUser] = useState(null)

    return (
        <div className='chat-container'>
            <ChatHeader user={user}/>

            <div>
                <button className='option' onClick={() => setClickedUser(null)}>Matches</button>
                <button className='option' disabled={!clickedUser}>Chat</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}
            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>
        
    );
}

export default ChatContainer