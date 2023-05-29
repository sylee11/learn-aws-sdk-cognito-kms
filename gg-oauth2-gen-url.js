import {google} from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  '745977841228-on8crv5le66em2rc6nmo8h8j8i3m9q57.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/accounts/google/login/callback/'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

const {tokens} = await oauth2Client.getToken('4/0AbUR2VM2FQ7vnf4wDG8Bd4oOEC2M1Yc5uHtwoshFc9W5FgnEba2LCV1lgFhXsA2_EPWIfg')
console.log(tokens)

// console.log(url)
