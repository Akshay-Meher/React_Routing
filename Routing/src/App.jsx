// App.js
//   ;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Mens";
import Womens from "./Pages/Womens";
import Mens from "./Pages/Mens";
import Kids from './Pages/Kids';
import PrivateRoute from './Pages/PrivateRoute';
import './App.css';
import RootLayout from './Pages/RootLayout';
import LoginContext from './components/context/LoginContext';
import { useState } from 'react';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  let localUser = JSON.parse(localStorage.getItem('userLogin'));
  console.log(localUser);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, localUser }}>
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<PrivateRoute Comp={Dashboard} />} >
              <Route path="mens" element={<PrivateRoute Comp={Mens} />} />
              <Route path="womens" element={<PrivateRoute Comp={Womens} />} />
              <Route path="kids" element={<PrivateRoute Comp={Kids} />} />
            </Route>
          </Route>
        </Routes>
      </Router >
    </LoginContext.Provider>
  );
}

export default App;
