import USER_EMAIL from './actionTypes';

const actionEmail = (payloademail) => ({
  type: USER_EMAIL,
  payloademail,
});

export default actionEmail;
