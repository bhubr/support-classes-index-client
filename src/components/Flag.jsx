/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './Flag.css';

const flags = {
  fr: 'france',
  uk: 'u-k',
};

function Flag({ lang, i18n }) {
  return (
    <img
      alt={lang}
      className="Flag"
      src={`/img/${flags[lang]}.gif`}
      onClick={() => i18n.changeLanguage(lang)}
    />
  );
}

Flag.propTypes = {
  lang: PropTypes.string.isRequired,
  // changeLanguage: PropTypes.func.isRequired,
};

export default Flag;
