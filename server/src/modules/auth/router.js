let Router = require("koa-router");

const { reply, getCollection, userManager } = require("@modular-rest/server");
const { google } = require("googleapis");

let name = "auth";
let auth = new Router();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const CLIENT_ID_EXTENSION = process.env.GOOGLE_OAUTH_CLIENT_ID_EXTENSION;
const REDIRECT_URI = "http://localhost:8080/auth/google/code-login";
const SCOPE = "https://www.googleapis.com/auth/userinfo.email";

auth.get("/google", async (ctx) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });

  ctx.response.redirect(url);
});

auth.get("/google/code-login", async (ctx) => {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  const oauth2Api = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { tokens } = await oauth2Client.getToken(ctx.query.code);
  oauth2Client.setCredentials(tokens);

  const googleUser = await oauth2Api.userinfo.get();
  const googleEmail = googleUser.data.email;

  const registeredUser = await userManager
    .getUserByIdentity(googleEmail, "email")
    .catch((e) => null);

  if (!registeredUser) {
    try {
      await userManager.registerUser({ email: googleEmail });
    } catch (error) {
      ctx.throw(500, error);
      return;
    }
  }

  const token = await userManager.issueTokenForUser(googleEmail);

  ctx.body = reply.create("s", { token });
});

auth.get("/google/token-login", async (ctx) => {
  const extensionUserToken = ctx.query.token;
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID_EXTENSION);
  const payload = await oauth2Client.getTokenInfo(extensionUserToken);
  const googleEmail = payload.email;

  const registeredUser = await userManager
    .getUserByIdentity(googleEmail, "email")
    .catch((e) => null);

  if (!registeredUser) {
    try {
      await userManager.registerUser({ email: googleEmail });
    } catch (error) {
      ctx.throw(500, error);
      return;
    }
  }

  const token = await userManager.issueTokenForUser(googleEmail);

  ctx.body = reply.create("s", { token });
});

module.exports.name = name;
module.exports.main = auth;
