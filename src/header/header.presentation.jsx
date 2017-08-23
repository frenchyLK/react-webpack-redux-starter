import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.scss';

const LoggedOutControls = ({ t, location }) => {
  return (<div className={ styles.rightControls }>
    {
      location.pathname.includes('login') ?
      null :
      <Link to="/login">
        <input type="button" value={ t('header:login') } />
      </Link>
    }
  </div>)
};

const LoggedInControls = ({ user, t }) => {
  return (<div>
    { `Hello ${user.get('name')}` }
    <input type="button" value={ t('header:logout') } />
  </div>)
};

const Header = (props) => {
  const { user, t } = props;

  return (<div className={ styles.headerBar }>
    <div className={ styles.leftControls }>
      <h4>
        {
          user ?
          t('header:welcome', { username: user.get('name') }) :
          t('header:welcome_new_user')
        }
      </h4>
    </div>
    { user ? <LoggedInControls {...props} /> : <LoggedOutControls {...props} /> }
  </div>)
};

LoggedOutControls.propTypes = LoggedInControls.propTypes = Header.propTypes = {
  /* information about the user; containing their name and list of roles  */
  user: IPropTypes.mapContains({
    name: PropTypes.string.isRequired,
    roles: IPropTypes.listOf(PropTypes.string).isRequired
  }),

  t: PropTypes.func.isRequired
}

export default Header;
