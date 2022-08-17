import Home from "./pages/home.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Onboarding from "./pages/onboarding.tsx";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const App = () => {

  const [cookies, setCookies, removeCookies] = useCookies(['cookie-name']);

  let authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        {authToken && <Route path={'/dashboard'} element={<Dashboard/>}/>}
        {authToken && <Route path={'/onboarding'} element={<Onboarding/>}/>}  
      </Routes>
    </BrowserRouter>
  );

}

export default App
