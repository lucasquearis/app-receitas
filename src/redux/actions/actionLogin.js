export const EMAIL = 'EMAIL';

const actionLogin = (state) => ({
  type: EMAIL,
  payload: {
    email: state,
  },
});

export default actionLogin;
