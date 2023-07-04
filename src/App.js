
import Header from './Components/Header';
import { Cards } from './Components/Cards';
import { Route, Routes } from 'react-router-dom';
import Addmovie from './Components/Addmovie';
import Details from './Components/Details';
import { createContext, useState, useEffect } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';


const Appstate = createContext();
function App() {

 

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{ login, userName, setLogin,setUserName }}>
      <div className="App relative">
        <Header></Header>
        <Routes>
          <Route path='/' element={<Cards></Cards>}></Route>
          <Route path='/addmovie' element={<Addmovie></Addmovie>}></Route>
          <Route path='/Details/:id' element={<Details></Details>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
        </Routes>

      </div>
    </Appstate.Provider>

  );
}

export default App;
export  {Appstate};
