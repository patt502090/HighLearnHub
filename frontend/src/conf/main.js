const conf = {
  apiUrlPrefix: 'http://localhost:1337/api',
  loginEndpoint: '/auth/local',
  registerEndpoint: '/api/auth/local/register',
  jwtUserEndpoint: '/users/me?populate=role',
  jwtSessionStorageKey: 'auth.jwt',
}

export default conf;