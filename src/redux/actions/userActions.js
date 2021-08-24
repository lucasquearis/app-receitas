export const SEND_USER_INFO = 'SEND_USER_INFO';

export const sendUserInfo = (info) => ({
  type: SEND_USER_INFO, info,
});
