const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
var userToken = "00Kh4T41lZi4P8af2TTVQVmNIgliM2T-IdzBvY9fgM";
//var clientId = "0oaheei0gfk2eQvDu0h7";
//var secrets = "PTO9hIQ07sboDcGj-kzXWipKLWQ_2SCH8zLvUuWK";

// Define an Okta client so any user management tasks can be performed
const oktaClient = new okta.Client({
    orgUrl: "https://dev-646008.oktapreview.com",
    token: userToken
});

// Define the OpenID Connect client
const oidc = new ExpressOIDC({
    issuer: process.env.OKTA_ORG_URL + "/oauth2/default",
    client_id: "0oaheei0gfk2eQvDu0h7",
    client_secret: "PTO9hIQ07sboDcGj-kzXWipKLWQ_2SCH8zLvUuWK",
    redirect_uri: process.env.OKTA_CALLBACK_URI || "http://localhost:3000/users/callback",
    scope: "openid profile",
    routes: {
        login: {
            path: "/users/login"
        },
        callback: {
            path: "/users/callback",
            defaultRedirect: "/dashboard"
        }
    }
});


module.exports = {
    oidc,
    oktaClient
};