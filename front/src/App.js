import React from 'react';
import SessionCreateForm from './components/SessionCreateForm';
import SessionList from './components/SessionList';

function App() {

  return (
    <div className="App">
      <SessionList />
      <SessionCreateForm />
    </div>
  );
}

export default App;
