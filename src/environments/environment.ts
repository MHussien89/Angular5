// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // apiBase: 'http://localhost:8080/CustomerCare-webservice',
  apiBase: 'http://95.177.208.115:8080/CustomerCare-webservice',
  // apiBase: '/CustomerCare-webservice',

  appBase: 'http://localhost:4200',
  // appBase: 'http://cc.test.s-blox.com',

  gatewayBase: 'https://secure.telr.com',
  // gatewayBase: '',

  paymentMode: '1',
  env: 'dev'
};
