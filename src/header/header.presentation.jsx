import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import ROLES from 'authorization-api/constants';
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
    {
      user.get('roles').contains(ROLES.ADMIN) ?
      <Link to="/admin">
        { t('header:administration') }
      </Link> :
      null
    }
    {
      user.get('roles').contains(ROLES.USER) ?
      <Link to="/dashboard">
        { t('header:dashboard') }
      </Link> :
      null
    }
    <input type="button" value={ t('header:logout') } />
  </div>)
};

const Header = (props) => {
  const { user } = props;

  return (<div className={ styles.headerBar }>
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
