import TinderCard from "react-tinder-card";
import { React, FC, ReactNode, useEffect, useState } from "react";
import ChatContainer from '../components/ChatContainer.tsx'
import axios from "axios";
import { useCookies } from 'react-cookie'
import { match } from "assert";
import ReactPlayer from 'react-player'

const Dashboard = () => {
  type TinderCardProps = Parameters<typeof TinderCard>[0];
  type TinderCardPropsWithChildren = TinderCardProps & { children?: ReactNode };
  const TinderCardWithChildren: FC<TinderCardPropsWithChildren> = TinderCard;

  const [user, setUser] = useState<any>(null)
  const [cookies, setCookie, removeCookie] = useCookies()
  const [genderedUsers, setGenderedUsers] = useState<any>(null)
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: {gender : user?.role_interest }
      })
      setGenderedUsers(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      getGenderedUsers()
    }
  }, [user])

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      }) 
      getUser()
    } catch(error) {
      console.log(error)
    }
  }
  
  const swiped = (direction, swipedUserId) => {
    
    if (direction === 'right') {
      updateMatches(swipedUserId)
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  let matchedUserIds: {user_id: string}[];
  
  if (user && user.matches !== [] && user.matches !== undefined) {
    matchedUserIds = user.matches.map(({user_id}) => user_id).concat(userId)
  } else {
    matchedUserIds = []
  }
  
  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  )

  return (
    <> {user &&
      <div className={"dashboard"}>
        <ChatContainer user={user} />
        <div className="swipe-container">
          <div className="cardContainer">
            {filteredGenderedUsers?.map((genderedUsers) => (
              <TinderCardWithChildren
                className="swipe"
                key={genderedUsers.user_id}
                onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
                onCardLeftScreen={() => outOfFrame(genderedUsers.professional_name)}
              >
                <div
                  style={{ backgroundImage: "url(" + genderedUsers.url + ")" }}
                  className="card"
                >
                  <h3 className="name-border">{genderedUsers.professional_name}</h3>
                </div>
                <ReactPlayer style={{border: 'solid 20px #1C98D3', borderRadius: '30px', position: 'absolute', top: 520, left: -5}} light={true} url={genderedUsers.song + 'theme=light&color=blue'} controls={true} height='100px' width='370px'/>
              </TinderCardWithChildren>
            ))}
            {/* <div className='swipe-info'>
              {lastDirection ? <p>You swiped {lastDirection} </p> : <p />}
            </div> */}
          </div>
        </div>
      </div>
    }
    </>
  );
};
export default Dashboard;
