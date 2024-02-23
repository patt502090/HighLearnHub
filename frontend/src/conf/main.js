const conf = {
  apiUrlPrefix: 'http://localhost:1337/api',
  urlPrefix: 'http://localhost:1337',
  loginEndpoint: '/auth/local',
  registerEndpoint: '/auth/local/register',
  jwtUserEndpoint: '/users/me?populate=role',
  jwtSessionStorageKey: 'auth.jwt',
  googleConnectEndpoint: '/connect/google',

}

export default conf;