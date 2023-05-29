import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  InitiateAuthCommand, SignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";
import {OAuth2Client} from "google-auth-library";

const clientId = '1nufhtahtg7vp3m09b68pvpoot'
const userPoolId = 'us-east-1_30nV8GJKk';

const googleClientId = '745977841228-on8crv5le66em2rc6nmo8h8j8i3m9q57.apps.googleusercontent.com';
const googleClientSecret = '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';

async function signInWithGoogle(authorizationCode) {
  // Step 1: Exchange authorization code for access token and ID token
  const oAuth2Client = new OAuth2Client(googleClientId, googleClientSecret);
  
  // const { tokens } = await oAuth2Client.getToken({
  //   code: authorizationCode,
  //   redirect_uri: 'http://localhost:3000/accounts/google/login/callback/',
  // });
  // const { id_token: idToken } = tokens;
  const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMzNjA4MzI2OTcwOTg3MzQzMTIiLCJlbWFpbCI6IndheW9mbGExMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ6aGhzTVZCSURYS05FbWh0UjZqQTRRIiwibmFtZSI6ImFuIGtpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGJDUENqSHFLcjVGSUtNVEZBRm9EaWZhd09YYWY4Z3ZoWnAtQjQ5TEE9czk2LWMiLCJnaXZlbl9uYW1lIjoiYW4iLCJmYW1pbHlfbmFtZSI6ImtpIiwibG9jYWxlIjoidmkiLCJpYXQiOjE2ODQ4OTk2OTksImV4cCI6MTY4NDkwMzI5OX0.SVCWe5u7fiGg3Y2ovoEc5BjkjqKkNachBQSBAP5Wge87OMcoDyww3JztCL3zorrFBY3Xcw7aOcudebRmPIJsWVhJZnye4R6VNKKYV_WUADpSiplKbst88WEfcyDO_4buBQsAYoSl7Yzw1CUEa1AW2sVk5H28xUaXastr79lq-Fi1RlV2NNV8kcMdxuYjIfiQjl4Y-rtZdYzYeIwl8R_PkCVKRRK_KpWvzm8V70xbsVZN5-72y-ZuuvsM7fBboPlDKAF8cIqWy9q4oY1huTc0wip2HjvfvFC_vFn5TPUPbKFWtC5PqmTML38WaZdOGcGPwXPyb0o3NtWXtc1WlYRd0w'
  
  const ticket = await oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: googleClientId
    })
  const  googlePayload = ticket.getPayload()

  console.log(googlePayload)

  // Step 2: Authenticate with Cognito User Pool
  const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });
  const initiateAuthParams = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: googlePayload?.email,
      PASSWORD: googlePayload?.sub,
    },
    UserPoolId: userPoolId
  };
  
  const params = {
      ClientId: clientId,
      Username: googlePayload.email.split("@")[0], // Username extracted from email address
      Password: googlePayload.sub,
      UserAttributes: [
        {
          Name: 'email',
          Value: googlePayload.email
        },
        // {
        //   Name: 'custom:RegistrationMethod',
        //   Value: 'google'
        // }
      ],
      ClientMetadata: {
        'EmailVerified': googlePayload.email_verified.toString()
      }
    }

  try {
    // const response = await cognitoClient.send(new AdminInitiateAuthCommand(initiateAuthParams));
    const response = await cognitoClient.send(new SignUpCommand(params));
    console.log('Đăng nhập thành công:', response.AuthenticationResult);
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
  }
}

// Usage
const authorizationCode = '4/0AbUR2VPf731rfszZkUBgM5EodPb40xyz3VUJ8jaR5ubtudeSuNl301U46Y8y8KzrR3jbMQ';
await signInWithGoogle(authorizationCode);