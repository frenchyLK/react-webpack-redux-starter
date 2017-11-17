import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.scss';

const LoggedOutControls = ({ t, user, location }) => {
  return (<div className={ styles.rightControls }>
    {
      location.pathname.includes('login') && !user ?
      null :
      <Link to="/login">
        <input type="button" value={ t('header:login') } />
      </Link>
    }
  </div>)
};

const LoggedInControls = ({ t, user, logout }) => {
  return (
    <div>
      <input type="button" value={ t('logout') } onClick={() => logout(user)}/>
    </div>
  )
};

const Header = (props) => {
  const { user, t } = props;

  return (<div className={ styles.headerBar }>
    <div className={ styles.leftControls }>
      <h4>
        {
          user ?
          t('header:welcome', { username: user.username }) :
          t('header:welcome_new_user')
        }
      </h4>
    </div>
    { user ? <LoggedInControls {...props} /> : <LoggedOutControls {...props} /> }
  </div>)
};

LoggedOutControls.propTypes = LoggedInControls.propTypes = Header.propTypes = {
  /* information about the user; containing their name and list of roles  */
  user: PropTypes.shape({ }),

  t: PropTypes.func.isRequired
}

export default Header;
