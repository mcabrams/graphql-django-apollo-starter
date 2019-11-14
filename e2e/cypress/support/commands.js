const USERNAME_EMAIL_PASSWORD_MAP = {
  superuser: {
    email: 'foobar@example.com',
    password: 'foobar1234',
  },
  userWithDoppelganger: {
    email:  'userWithDoppelganger@example.com',
    password: 'foobar1234',
  },
  doppelganger: {
    email: 'doppelganger@example.com',
    password: 'foobar1234',
  },
  noAnsweredQuestions: {
    email: 'noAnsweredQuestions@example.com',
    password: 'foobar1234',
  },
};

Cypress.Commands.add('login', (user) => {
  const { email, password } = USERNAME_EMAIL_PASSWORD_MAP[user || 'superuser'];

  cy.request({
    method: 'POST',
    url: Cypress.env('SERVER_GRAPHQL_URL'),
    body: {
      "operationName": "TokenAuth",
      "variables": {"email": email,"password": password},
      "query": "mutation TokenAuth($email: String!, $password: String!) {\n  tokenAuth(email: $email, password: $password) {\n    ...TokenAuthResponse\n    __typename\n  }\n}\n\nfragment TokenAuthResponse on ObtainJSONWebToken {\n  token\n  __typename\n}\n",
    },
  }).then((resp) => {
    window.localStorage.setItem('loggedIn', true);
    cy.reload();
  });
});
