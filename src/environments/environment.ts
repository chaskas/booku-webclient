// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //host: "http://xsknet.dyndns.org:3001/" // PROD
  //  host: "http://xsknet.dyndns.org:82"   // TEST
  //host: "http://localhost:3000"         // DEV
  host: "http://192.168.1.100:3000"        // DEV
};
