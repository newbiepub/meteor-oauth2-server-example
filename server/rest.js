/**
 * This is an example where we use the oAuth2 server to allow/deny access to our REST service.
 * In this example, we will use JsonRoutes.
 */

/**
 * First we define the middle-ware to use. This ensures the oauth2 server validation code
 * is ran whenever /api/* is accessed from our server. Doing this let's your rest service
 * take full advantage of oauth2 without all the boiler plate.
 * It is expected whenever a /api url is called, a "access_token" is present in the
 * query or the body.
 */
JsonRoutes.Middleware.use(
    '/api/*',
    oAuth2Server.oauthserver.authorise()
);