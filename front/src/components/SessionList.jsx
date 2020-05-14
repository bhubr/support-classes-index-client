import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionList() {
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get('/session/index');
        setSessions(data);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchSessions();
  }, []);

  if (!sessions) {
    return <div className="loading" />;
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-12">
          {
            sessions.map(({ id, title, description, language, created_at: createdAt }) => (
              <div className="card" key={id}>
                <div className="card-header">
                  <div className="card-title h5">{title}</div>
                  <div className="card-subtitle text-gray">{language} {createdAt}</div>
                </div>
                <div className="card-body">
                  {description}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SessionList;
