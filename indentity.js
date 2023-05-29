import {CreateBucketCommand, S3Client} from "@aws-sdk/client-s3";
// import {S3Client} from "@aws-sdk/client-ksm";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {initiateAuth} from "./init-auth.js";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  CancelKeyDeletionCommand,
  CreateKeyCommand
} from "@aws-sdk/client-kms";


const REGION = 'us-east-1'
const IDENTITY_POOL_ID = "us-east-1:013345fb-efc9-44e8-a21f-bfb0e5c8c877"
const USER_POOL_ID = "us-east-1_30nV8GJKk"

const auth = await initiateAuth({username: 'tesava22vsfs@yopmail.com', password: "Admin@123456123", clientId: '1nufhtahtg7vp3m09b68pvpoot'})
// console.log(auth.AuthenticationResult.IdToken)
const kmsClient = new KMSClient({
  region: REGION,
  // credentials: fromCognitoIdentityPool({
  //   clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
  //   identityPoolId: IDENTITY_POOL_ID,
  //   logins: {
  //           [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`] : auth.AuthenticationResult.IdToken
  //       },
  // })
});

// const cognitoIdentityClient = new CognitoIdentityClient({
//   region: REGION,
// });
//
// const kmsClient = new KMSClient({
//   region: REGION,
// });

// const credentials = fromCognitoIdentityPool({
//   client: cognitoIdentityClient,
//   identityPoolId: IDENTITY_POOL_ID,
// });
//
// const credentialPromise = credentials();

// Sử dụng async/await hoặc .then để lấy thông tin credentials
// const { accessKeyId, secretAccessKey, sessionToken } = await credentialPromise;
const text = 'Hello, world!';
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const encodedText = encoder.encode(text);

const input = { // EncryptRequest
  KeyId: "6bf39a35-8294-4986-a56c-1da1656445cf", // required
  Plaintext: encodedText, // required
  EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
  
};
const command = new EncryptCommand(input);
const response = await kmsClient.send(command);
console.log(response)


// const input = { // CreateKeyRequest
//   Policy: "avafs12312",
//   Description: "asdfasdfsadf",
//   KeyUsage: "ENCRYPT_DECRYPT",
//   CustomerMasterKeySpec: "HMAC_512",
//   KeySpec: "HMAC_512",
//   Origin: "AWS_KMS",
// };
// const command = new CreateKeyCommand(input);
// const response = await kmsClient.send(command);

// const s3Client = new S3Client({
//   region: REGION,
//   credentials: fromCognitoIdentityPool({
//     clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
//     identityPoolId: IDENTITY_POOL_ID,
//     logins: {
//             [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`] : auth.AuthenticationResult.IdToken
//         },
//   })
// });
//
// const input = { // CreateBucketRequest
//   Bucket: "rsssrs12312", // required
// };
//
// const command = new CreateBucketCommand(input);
// const response = await s3Client.send(command);
// console.log(response)