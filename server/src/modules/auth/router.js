let Router = require("koa-router");

const { reply, getCollection } = require("@modular-rest/server");
const { google } = require("googleapis");

let name = "auth";
let backup = new Router();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/auth/google/oauth2callback";
const SCOPE = "https://www.googleapis.com/auth/userinfo.email";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const oauth2Api = google.oauth2({
  auth: oauth2Client,
  version: "v2",
});

backup.get("/google", async (ctx) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });

  ctx.response.redirect(url);
});

backup.get("/google/oauth2callback", async (ctx) => {
  const { tokens } = await oauth2Client.getToken(ctx.query.code);
  oauth2Client.setCredentials(tokens);

  const user = await oauth2Api.userinfo.get();

  ctx.body = { user };
});

module.exports.name = name;
module.exports.main = backup;
