import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import AuthContext from '../AuthContext';

function SessionList() {
  const [sessions, setSessions] = useState(null);
  const { isTrainer } = useContext(AuthContext);

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
              <div className="SessionCard card" key={id}>
                <div className="card-header">
                  <div className="float-right">
                    <img className="SessionCard__img" src={`/img/${language}-logo.svg`} alt={`${language} logo`} />
                  </div>
                  <div className="card-title h5">
                    {title}
                    {isTrainer && (
                      <Link className="SessionCard__editLink" to={`/edit-session/${id}`}>Edit</Link>
                    )}
                  </div>
                  <div className="card-subtitle text-gray">{createdAt}</div>
                </div>
                <div className="card-body">
                  <Markdown source={description} />
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
