import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SessionCreateForm from './components/SessionCreateForm';
import SessionEditForm from './components/SessionEditForm';
import SessionList from './components/SessionList';
import AuthContext from './AuthContext';

function App() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const getCode = async (code) => {
    try {
      const { data } = await axios.post('/auth/code', { code });
      console.log('getCode', data);
      setAuth(data);
    } catch (err) {
      setError(err);
    }
  }
  const onSuccess = ({ code }) => getCode(code);
  const onFailure = (response) => console.error(response);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setAuth({ loading: true });
        const { data } = await axios.get('/auth/me');
        setAuth(data);
      } catch (err) {
        console.error(err.message);
        setAuth(null);
      }
    }
    fetchProfile();
  }, []);

  if (!auth) {
    return (
      <Login onSuccess={onSuccess} onFailure={onFailure} />
    );
  }

  if (auth.loading) {
    return <div className="loading" />;
  }

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <Navbar auth={auth} setAuth={setAuth} />
        <Switch>
          <Route exact path="/" component={SessionList} />
          <Route path="/create-session" component={SessionCreateForm} />
          <Route path="/edit-session/:id" component={SessionEditForm} />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
