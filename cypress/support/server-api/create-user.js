export function createUser({ realmId }) {
  return cy
    .request('POST', 'http://ops:9090/users', { realm: realmId })
    .then(({ body }) => ({
      email: body.email,
      password: body.password,
    }));
}
