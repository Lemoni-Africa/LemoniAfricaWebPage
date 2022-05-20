// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'http://10.0.33.12:8017',
  centralAdmin: 'http://10.0.33.12:8063',
  transaction: 'http://10.0.33.12:8212',
  emailUrl: 'https://genericapis.myapiservices.net',
  liveCoinUrl: 'https://verifier-api-lemoni.herokuapp.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
