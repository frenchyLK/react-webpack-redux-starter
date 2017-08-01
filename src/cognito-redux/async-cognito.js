import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { COGNITO_POOL_DETAILS } from 'APP_CONFIG';
const pool = new CognitoUserPool(COGNITO_POOL_DETAILS);

export const login = ({ username, password }) => {
  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Pool: pool,
    Username: username
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: (e) => {
        // new password doesn't have relevant error information;
        // so lets add a message and a code for our own purposes
        e.message = 'New password is required for user';
        e.code = 'NewPasswordRequired';
        reject(e);
      },
      mfaRequired: (e) => {
        // same as above
        e.message = 'Multi-step authorization required';
        e.code = 'MFARequired';
        reject(e);
      },
      customChallenge: reject
    });
  });

};
