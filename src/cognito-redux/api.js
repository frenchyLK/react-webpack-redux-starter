import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { COGNITO_POOL_DETAILS } from 'APP_CONFIG';
const pool = new CognitoUserPool(COGNITO_POOL_DETAILS);

const generateAuthEntites = ({ username, password }) => {
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Pool: pool,
    Username: username
  });

  return { details: authDetails, user: cognitoUser };
};

const DEFAULT_CALLBACK_HANDLERS = {
  onSuccess: Promise.resolve,
  onFailure: e => Promise.reject({ error: e }),
  newPasswordRequired: (userAttributes, requiredAttributes) => {
    // new password doesn't have relevant error information;
    // so lets add a message and a code for our own purposes
    const e = new Error();
    e.message = 'New password is required for user';
    e.code = 'NewPasswordRequired';
    return Promise.reject({ error: e, userAttributes, requiredAttributes });
  },
  mfaRequired: () => {
    // same as above
    const e = new Error();
    e.message = 'Multi-step authorization required';
    e.code = 'MFARequired';
    return Promise.reject({ error: e });
  },
  customChallenge: e => Promise.reject({ error: e })
};

/*
 * Set the password for a user when performing the newPasswordRequired flow.
 * This will execute an authenticateUser call with the sole intent of failing.
 */

const _login = (props, handlers) => {
  const { details, user } = generateAuthEntites(props);

  return new Promise((resolve, reject) => {
    user.authenticateUser(details, DEFAULT_CALLBACK_HANDLERS);
  });
}

export const login = (props) => {
  return _login(props)
    .catch({ error } => Promise.reject(error));

};
