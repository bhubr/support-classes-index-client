import React from 'react';
import axios from 'axios';
import SessionForm from './SessionForm';

const initialFormData = {
  title: '',
  description: '',
  language: '',
  createdAt: '',
  resources: []
};

function SessionCreateForm() {
  const sendData = (formData) => axios.post('/session/create', formData);

  return (
    <SessionForm
      initialFormData={initialFormData}
      sendData={sendData}
      buttonText="Create"
    />
  )
}

export default SessionCreateForm;