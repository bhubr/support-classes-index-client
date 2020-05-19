import React from 'react';
import axios from 'axios';
import SessionForm from './SessionForm';

const { REACT_APP_API_URL } = process.env;

const initialFormData = {
  title: '',
  description: '',
  language: '',
  createdAt: '',
  resources: []
};

function SessionCreateForm() {
  const sendData = (formData) => axios.post(`${REACT_APP_API_URL}/session/create`, formData);

  return (
    <SessionForm
      initialFormData={initialFormData}
      sendData={sendData}
      buttonText="Create"
    />
  )
}

export default SessionCreateForm;
