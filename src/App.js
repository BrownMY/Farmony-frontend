// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';
//Routes
import routes from './config/routes'
// Components
import Buy from './components/ForumPages/Buy'
import Volunteer from './components/ForumPages/Volunteer'
import Footer from './components/Footer';
import Holistic from './components/ForumPages/Holistic'
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Signup from './components/Signup';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem('jwtToken');
  console.log('===> Hitting a Private Route');
  return <Route {...rest} render={(props) => {
    return token ? <Component {...rest} {...props} /> : <Redirect to="/login" />
  }} />
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  return (
    <div className="App">
      <div className='main-container'>
        <div className="nav">
          <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} user={currentUser} />
        </div>
        <div className="route-views">
          <Switch className="switch">
            <Route path='/signup' component={Signup} />
            <Route
              path="/login"
              render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />}
            />
            <Route
              path="/holistichub"
              render={() => <Holistic user={currentUser} componentModel={'HolisticModel'} />}
            />
            <Route
              exact path='/buy'
              render={() => <Buy user={currentUser} componentModel={'BuyModel'} />}
            />
            <Route
              exact path='/volunteer'
              render={() => <Volunteer user={currentUser} componentModel={'VolunteerModel'} />}
            />
            <PrivateRoute path="/profile" component={Profile} user={currentUser} handleLogout={handleLogout} />
            {/* <Route path="/trade" component={Trade} /> */}
          </Switch>
          <div className='route-view'>
            {routes}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;