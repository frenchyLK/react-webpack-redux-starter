export default (values) => {
  const errors = {};

  if(!values.get('username')) {
    errors.username = 'login:username_required';
  }

  if(!values.get('password')) {
    errors.password = 'login:password_required';
  }

  return errors;
};
