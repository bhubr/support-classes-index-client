import React, { useState } from 'react';
import axios from 'axios';


function SessionForm({ initialFormData, sendData, onSendDataSuccess, buttonText }) {
  const [formData, setFormData] = useState(initialFormData);
  const [tempId, setTempId] = useState(1);
  const [error, setError] = useState(null);

  const onChange = ({ target }) => {
    const { name, value } = target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    sendData(formData)
      .then(onSendDataSuccess)
      .catch(setError);
  }

  const onChangeResource = (id) => ({ target }) => {
    const { name, value } = target;
    const nextResources = formData.resources.map((resource) => {
      if (resource.id !== id) return { ...resource };
      return { ...resource, [name]: value };
    });
    const nextFormData = { ...formData, resources: nextResources };
    setFormData(nextFormData);
  };

  const addResource = (event) => {
    const nextResources = [...formData.resources, { id: `tmp-${tempId}`, title: '', link: '' }];

    const nextFormData = { ...formData, resources: nextResources };
    setFormData(nextFormData);
    setTempId(tempId + 1);
  }

  const {
    title, description, language, createdAt, resources
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

            {
              resources.map((rsc) => (
                <div key={rsc.id}>

                  <div className="form-group">
                    <label htmlFor={`title-${rsc.id}`} className="form-label form-inline">
                      Title
                      <input id={`title-${rsc.id}`} className="form-input" name="title" type="text" value={rsc.title} onChange={onChangeResource(rsc.id)} />
                    </label>
                    <label htmlFor={`link-${rsc.id}`} className="form-label form-inline">
                      Link
                      <input id={`link-${rsc.id}`} className="form-input" name="link" type="text" value={rsc.link} onChange={onChangeResource(rsc.id)} />
                    </label>
                  </div>

                </div>
              ))
            }
            <button type="button" onClick={addResource}>+</button>

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