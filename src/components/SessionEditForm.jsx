import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SessionForm from './SessionForm';

const { REACT_APP_API_URL } = process.env;

function SessionEditForm() {
  const [session, setSession] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(`${REACT_APP_API_URL}/session/get/${id}`);
        const { created_at: createdAt, ...rest } = data;
        setSession({ createdAt, ...rest });
      } catch (err) {
        alert(err.message);
      }
    }
    fetchSession();
  }, []);

  const sendData = ({ id, ...formData }) => axios.post(`/session/update/${id}`, formData);

  if (!session) {
    return <div className="loading" />;
  }
  return (
    <SessionForm
      initialFormData={session}
      sendData={sendData}
      buttonText="Update"
    />
  )
}

export default SessionEditForm;
