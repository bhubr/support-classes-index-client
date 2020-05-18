import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import OAuthLogin from 'react-simple-oauth2-login';
import Flag from './Flag';
import WildLogo from './WildLogo';
import './Login.css';

const {
  REACT_APP_OAUTH_URL: authorizationUrl,
  REACT_APP_OAUTH_CLIENT_ID: clientId,
  REACT_APP_OAUTH_REDIRECT: redirectUri,
} = process.env;

function Login({ onSuccess, onFailure }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="Login">
      <nav className="Login__nav">
        <Flag lang="fr" i18n={i18n} />
        <Flag lang="uk" i18n={i18n} />
      </nav>
      <div className="Login__inner flex flex-center">
        <div className="flex flex-col flex-center">
          <div className="Login__backdrop">
            <WildLogo className="WildLogo--splash" splash />
            <h3>{t('signin.welcome')}</h3>
            <p>{t('signin.mustSignIn')}</p>
            <OAuthLogin
              authorizationUrl={authorizationUrl}
              clientId={clientId}
              redirectUri={redirectUri}
              responseType="code"
              onSuccess={onSuccess}
              onFailure={onFailure}
              className="btn btn-lg btn-coral mt-2"
              buttonText={t('signin.odyssey')}
            />
          </div>
        </div>
      </div>
      <div className="Login__credits flex flex-center">
        <div className="Login__credits__item">
          Background by{' '}
          <a
            href="https://unsplash.com/@mr_vero?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
            target="_blank"
            rel="noopener noreferrer"
            title="Download free do whatever you want high-resolution photos from Irvan Smith"
          >
            <span className="Login__credits__inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: '12px',
                  width: 'auto',
                  position: 'relative',
                  verticalAlign: 'middle',
                  top: '-2px',
                  fill: 'white',
                }}
                viewBox="0 0 32 32"
              >
                <title>unsplash-logo</title>
                <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
              </svg>
            </span>
            <span className="Login__credits__inner">Irvan Smith</span>
          </a>
        </div>
        <div className="Login__credits__item">
          Icons by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          @
          <a href="https://www.flaticon.com/" title="Flaticon">
            flaticon.com
          </a>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default Login;
