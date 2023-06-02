import {Route, BrowserRouter, Routes} from 'react-router-dom';
import './App.css'
import Source from './Source';
import Register from './pages/Register';
import Login from './pages/Login';
import Joke from './pages/Joke';
import useUser from './services/useUser';
import { useEffect } from 'react';
import NotFound from './pages/NotFound';

function App() {
  const {curUser, loginSuccsessfull, logout, autoLogin}= useUser();

  useEffect(()=>{
    autoLogin()
  },[])

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Source user={curUser} logout={logout}/>}>
            <Route path='/' element={<Joke isLoogedIn={curUser!=undefined} user={curUser}/>}/>
            <Route path='/register' element={<Register isLoggedIn={curUser!=undefined}/>}/>
            <Route path='/login' element={<Login onLogin={loginSuccsessfull} isLoggedIn={curUser!=undefined}/>} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
