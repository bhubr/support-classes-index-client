import React, { useState } from 'react';
import axios from 'axios';


function SessionForm({ initialFormData, sendData, onSendDataSuccess, buttonText }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const onChange = ({ target }) => {
    const { name, value } = target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    sendData(formData)
      .then(onSendDataSuccess)
      .catch(setError);
  }

  const {
    title, description, language, createdAt
  } = formData;

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-12">
          <form className="SessionForm" onSubmit={onSubmit}>
            {
              error && (
                <div className="toast toast-error">
                  {error.message}
                </div>
              )
            }

            <div className="form-group">
              <label className="form-label" htmlFor="title">Title</label>
              <input className="form-input" id="title" name="title" type="text" value={title} onChange={onChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea className="form-input" id="description" name="description" rows="4" value={description} onChange={onChange} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="language">Language</label>
              <select className="form-select" id="language" name="language" value={language} onChange={onChange}>
                <option value=""></option>
                <option value="php">PHP</option>
                <option value="js">JavaScript</option>
              </select>

            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">Date (MM/DD/YYYY)</label>
              <input className="form-input" id="date" name="createdAt" type="date" value={createdAt} onChange={onChange} />
            </div>

            <button className="btn btn-primary" type="submit">{buttonText}</button>
          </form>

        </div>
      </div>
    </div>
  );
}

SessionForm.defaultProps = {
  onSendDataSuccess: (res) => console.log(res.data)
}

export default SessionForm;