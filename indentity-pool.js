// const { CognitoIdentityClient, GetCredentialsForIdentityCommand } = require("@aws-sdk/client-cognito-identity");

// Cognito Identity Pool ID
import {CognitoIdentityClient, GetCredentialsForIdentityCommand} from "@aws-sdk/client-cognito-identity";

const identityPoolId = "us-east-1:013345fb-efc9-44e8-a21f-bfb0e5c8c877";

// Identity ID của người dùng đã xác thực
const identityId = "us-east-1:c36ddf3c-b107-4a6f-8afc-7ee5231dac80";

// Khởi tạo Cognito Identity Client
const client = new CognitoIdentityClient({ region: "us-east-1" });
const googleAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwMzc3MTc1ODI5MDgwNDU5NTUiLCJlbWFpbCI6ImRlbHluYXJhYmVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRnZLalhLRVRNN0dQSEJaRzhUaWpYdyIsIm5hbWUiOiJKYXNoaWEgTWF2ZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZWpHSXhFeWU0N3VFMHR3ckFUaV9YY3o4U2ZRVDQ0cWNBamFaN3A9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFzaGlhIiwiZmFtaWx5X25hbWUiOiJNYXZlcyIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjg0OTgzOTY3LCJleHAiOjE2ODQ5ODc1Njd9.I6iL-wHuBLlt8s6FBa8zR9O7u3rCs7llhoT-a88S46Tc4NTsHxsCYQBb1uMizu9dnHLScnmU-GqT5oZBOpSIleBz6MwZIBN6uQTd8K7UhOsBJVDNA2N5pdc_WMhzARqyXwhrX4_YVBY2qbG4nmML4EZGJid9uu-3EMK3d-A735EVo_tWHewITJq66aVmHducPUstyH4Rg0-ITwGeBSv8Lp3Pf9ea3YfAvMAEZa7qtg3I70ijrhB-GEyr1GkMAcdq40TwQwaQiDZtzU9D4kn0Hr1zd8CYW_BSkavXSWX9QoBU6cJXpvKU5NF71mgcVETAajeH2sSZ493tE7YMwK7IXg'
// Tạo command để lấy Credentials cho Identity
const command = new GetCredentialsForIdentityCommand({
  IdentityId: identityId,
  Logins: {
    // Các thông tin đăng nhập từ nhà cung cấp xác thực bên thứ ba (ví dụ: Google, Facebook)
    // Sử dụng "cognito-identity.amazonaws.com" làm key và access token của nhà cung cấp xác thực
     "accounts.google.com": googleAccessToken
  },
  IdentityPoolId: identityPoolId
});

// Gửi request và xử lý kết quả
client.send(command).then(response => {
  // Lấy credentials từ kết quả response
  const { Credentials } = response;

  // Sử dụng credentials để thực hiện các hoạt động trong AWS (ví dụ: truy cập S3, DynamoDB, v.v.)
  console.log("AccessKeyId:", Credentials.AccessKeyId);
  console.log("SecretKey:", Credentials.SecretKey);
  console.log("SessionToken:", Credentials.SessionToken);
}).catch(error => {
  console.error("Error:", error);
});