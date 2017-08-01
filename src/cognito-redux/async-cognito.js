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
      newPasswordRequired: reject,
      mfaRequired: reject,
      customChallenge: reject
    });
  });

};
