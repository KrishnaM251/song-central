import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'

const MatchesDisplay = ({ matches, setClickedUser }) => {

    const [matchedProfiles, setMatchProfiles] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies()

    const userId = cookies.UserId
    let matchedUserIds: { user_id: string }[];

    if (matches) {
        matchedUserIds = matches.map(({ user_id }) => user_id)
    } else {
        matchedUserIds = []
    }

    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                params: { userIds: JSON.stringify(matchedUserIds) }
            })
            setMatchProfiles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [matches])

    const filteredMatchedProfiles = matchedProfiles?.filter(
        (matchedProfile) =>
          matchedProfile.matches.filter((profile) => profile.user_id == userId)
            .length > 0
      );


    return (
        <div className="matches-display">
            {matchedProfiles?.map((match) => (
                <div
                    key={match.user_id}
                    className="match-card"
                    onClick={() => setClickedUser(match)}
                >
                    <div className="image-container">
                        <img src={match?.url} alt={match?.professional_name + " profile"} />
                    </div>
                    <h3>{match?.professional_name}</h3>
                </div>
            ))}
        </div>

    );
}

export default MatchesDisplay