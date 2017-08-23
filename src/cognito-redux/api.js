import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { COGNITO_POOL_DETAILS } from 'APP_CONFIG';
import autobind from 'class-autobind';
import { ERRORS } from './constants';

const pool = new CognitoUserPool(COGNITO_POOL_DETAILS);

const _requiredAttributePresent = (attribute, userAttributes, newAttributes) => {
  if(userAttributes && userAttributes[attribute] !== '') {
    return true;
  }

  if(newAttributes && newAttributes[attribute] !== '') {
    return true;
  }

  return false;
}

class CognitoAuthorizer {
  constructor(props) {
    this.props = props;

    const { username, password, session } = this.props;

    this.details = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    this.user = new CognitoUser({
      Pool: pool,
      Username: username
    });

    this.user.Session = session;

    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    autobind(this);
  }

  authorize() {
    this.props.mfaCode ?
    this.user.sendMFACode(this.props.mfaCode, this) :
    this.user.authenticateUser(this.details, this);

    return this._promise;
  }

  onSuccess(res) {
    return this._resolve({
      accessToken: {
        jwtToken: res.accessToken.jwtToken
      },
      idToken: {
        jwtToken: res.idToken.jwtToken
      },
      refreshToken: {
        token: res.refreshToken.token
      }
    });
  }

  onFailure(err) {
    return this._reject(err);
  }

  newPasswordRequired(userAttributes, requiredAttributes) {
    const { newPassword, attributesData } = this.props;

    if(newPassword) {
      const missingAttributes = requiredAttributes.filter(attr => {
        if(!_requiredAttributePresent(attr, userAttributes, attributesData)) {
          return attr;
        }
      });

      if(missingAttributes.length > 0) {
        return this._reject({
          code: ERRORS.AttributesRequired,
          attributesRequired: missingAttributes
        });
      }

      this.user.completeNewPasswordChallenge(newPassword, attributesData, this);

      return;
    }

    return this._reject({
      code: ERRORS.NewPasswordRequired, userAttributes, requiredAttributes
    });
  }

  mfaRequired() {
    const { mfaCode } = this.props;

    if(mfaCode) {
      return this.user.sendMFACode(mfaCode);
    }

    return this._reject({
      code: ERRORS.MFARequired,
      session: this.user.Session
    });
  }

  customChallenge(e) {
    return this._reject(e);
  }
}

export const authorize = (props) => {
  const authorizer = new CognitoAuthorizer(props);

  return authorizer.authorize();
};
