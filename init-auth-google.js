import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand, SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import createClientForDefaultRegion from "./index.js";

  const client = createClientForDefaultRegion(CognitoIdentityProviderClient);
/** snippet-start:[javascript.v3.cognito-idp.actions.InitiateAuth] */
// const initiateAuth = async ({ clientId }) => {
//   const client = createClientForDefaultRegion(CognitoIdentityProviderClient);
//  
//   const signUpParams = {
//     ClientId: clientId,
//     Username: 'wayofla111@gmail.com',
//     Password: "YOaPASSWORD12312A!", // Mật khẩu tạm thời cho việc xác thực
//     UserAttributes: [
//       { Name: "email", Value: 'wayofla111@gmail.com' },
//       // Các thuộc tính người dùng khác nếu cần
//     ],
//     ValidationData: [
//       { Name: "google-id-token", Value: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwMzc3MTc1ODI5MDgwNDU5NTUiLCJlbWFpbCI6ImRlbHluYXJhYmVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicF9iR3NtMGR1SjlxZEdob0xaQjlXUSIsIm5hbWUiOiJKYXNoaWEgTWF2ZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZWpHSXhFeWU0N3VFMHR3ckFUaV9YY3o4U2ZRVDQ0cWNBamFaN3A9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFzaGlhIiwiZmFtaWx5X25hbWUiOiJNYXZlcyIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjg0OTg3NjY5LCJleHAiOjE2ODQ5OTEyNjl9.bm0iE3gYQ1ntlJc2y3gngDWic9TY63nRE352_2W2hHG0tvL5rd8ivPTUxmtjbjoBxSAIdg54fzlEa1dzJR57JL6Uw1MkDzk9IZhTbQgNjHmRWtXjSCDUd3cCPgR-rwf1PNF-9QTXDGTbYQ4-YrR6qW4w1wra2gAA-mZYRj0uOM_fUA4L2mOx4v0KxPxLObPvwdkGXOn4oUq1zuNrfSteaRg_jgqnWlwqX78gXS8rz4cexfdOy_EXhZvXcLd6jO5uCQmdTrXIpuR2nBTwEEXETuIvoW8MdIiU9mwmos5kmfJpWnOnsS4yY7NgyfCBsk3aYm7UPmbUGKQRsB69P_jNTQ' },
//       // Dữ liệu xác thực từ Google IdToken
//     ],
// };
//
//   const command = new SignUpCommand(signUpParams);
//
//   return client.send(command);
// };
// /** snippet-end:[javascript.v3.cognito-idp.actions.InitiateAuth] */
// const a = await initiateAuth({clientId: '1nufhtahtg7vp3m09b68pvpoot'})
// console.log(a)


const command2 = new InitiateAuthCommand({
    AuthFlow: "USER_SRP_AUTH",
    ClientId: '1nufhtahtg7vp3m09b68pvpoot',
    AuthParameters: {
      USERNAME: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwMzc3MTc1ODI5MDgwNDU5NTUiLCJlbWFpbCI6ImRlbHluYXJhYmVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicF9iR3NtMGR1SjlxZEdob0xaQjlXUSIsIm5hbWUiOiJKYXNoaWEgTWF2ZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZWpHSXhFeWU0N3VFMHR3ckFUaV9YY3o4U2ZRVDQ0cWNBamFaN3A9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFzaGlhIiwiZmFtaWx5X25hbWUiOiJNYXZlcyIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjg0OTg3NjY5LCJleHAiOjE2ODQ5OTEyNjl9.bm0iE3gYQ1ntlJc2y3gngDWic9TY63nRE352_2W2hHG0tvL5rd8ivPTUxmtjbjoBxSAIdg54fzlEa1dzJR57JL6Uw1MkDzk9IZhTbQgNjHmRWtXjSCDUd3cCPgR-rwf1PNF-9QTXDGTbYQ4-YrR6qW4w1wra2gAA-mZYRj0uOM_fUA4L2mOx4v0KxPxLObPvwdkGXOn4oUq1zuNrfSteaRg_jgqnWlwqX78gXS8rz4cexfdOy_EXhZvXcLd6jO5uCQmdTrXIpuR2nBTwEEXETuIvoW8MdIiU9mwmos5kmfJpWnOnsS4yY7NgyfCBsk3aYm7UPmbUGKQRsB69P_jNTQ',
      // SECRET_HASH: "YOUR_SECRET_HASH", 
    },
  });

  const response = await client.send(command2);
  console.log(response)