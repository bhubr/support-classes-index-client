import React from 'react';
import PropTypes from 'prop-types';

function WildLogo({ splash, className }) {
  const img = splash ? 'wcs-logo-splash' : 'wcs-logo';
  return (
    <img
      className={className}
      alt="Wild Code School logo"
      src={`/img/${img}.png`}
    />
  );
}

WildLogo.defaultProps = {
  splash: false,
  className: 'WildLogo',
};

WildLogo.propTypes = {
  splash: PropTypes.bool,
  className: PropTypes.string,
};

export default WildLogo;
