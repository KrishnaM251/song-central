import { useState } from "react";
import Nav from "../components/Nav.tsx";
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from "axios";

const Onboarding = () => {
  let navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    professional_name: '',
    genre: '',
    location: '',
    role_identity: '',
    role_interest: '',
    url: '',
    about: '',
    song: '',
    matches: []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8000/user', { formData })
      const success = response.status === 200
      if (success) navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  };

  const handleChange = (e) => {

    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))

  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => { }} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="professional_name">Professional Name</label>
            <input
              id={"professional_name"}
              type="text"
              name="professional_name"
              placeholder="Thundercat"
              required={true}
              value={formData.professional_name}
              onChange={handleChange}
            />
            <label htmlFor="genre">Genre</label>
            <input
              id={"genre"}
              type="text"
              name="genre"
              placeholder="RnB"
              required={true}
              value={formData.genre}
              onChange={handleChange}
            />
            <label htmlFor="location">Location</label>
            <input
              id={"location"}
              type="text"
              name="location"
              placeholder="Bay Area"
              required={true}
              value={formData.location}
              onChange={handleChange}
            />
            
            
            <label>My Role</label>
            <div className="multiple-input-container">
              <input
                id="artist-identity"
                type="radio"
                name="role_identity"
                value="artist"
                onChange={handleChange}
                checked={formData.role_identity === 'artist'}
              />
              <label htmlFor="artist-identity">Artist</label>
              <input
                id="record-label-identity"
                type="radio"
                name="role_identity"
                value="record_label"
                onChange={handleChange}
                checked={formData.role_identity === 'record_label'}
              />
              <label htmlFor="record-label-identity">Record Label</label>
            </div>


            <label>My Interest</label>
            <div className="multiple-input-container">
              <input
                id="artist-interest"
                type="radio"
                name="role_interest"
                value="artist"
                onChange={handleChange}
                checked={formData.role_interest === 'artist'}
              />
              <label htmlFor="artist-interest">Artists</label>

              <input
                id="record-label-interest"
                type="radio"
                name="role_interest"
                value="record_label"
                onChange={handleChange}
                checked={formData.role_interest === 'record_label'}
              />
              <label htmlFor="record-label-interest">Record Labels</label>

            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <label htmlFor="about">Song</label>
            <input
              id="song"
              type="text"
              name="song"
              required={true}
              placeholder="Paste link here"
              value={formData.song}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className={"photo-container"}>
              {formData.url && <img src={formData.url} alt='Preview' />}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
