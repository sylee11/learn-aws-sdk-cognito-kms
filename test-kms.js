import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; // ES Modules import
// const { KMSClient, EncryptCommand } = require("@aws-sdk/client-kms"); // CommonJS import

const REGION = "us-east-1";
const IDENTITY_POOL_ID = "us-east-1:e759b501-5010-40d9-b1d3-03828accfdbd";
const USER_POOL_ID = "us-east-1_ySDHMvtdl";

const client = new KMSClient({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
    identityPoolId: IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]:
        "eyJraWQiOiJmWG9Wa2wwSUJ5bVRmcUY2MWlLdUJDODJ5MVh2SUFJXC9mZU9FQ3A0d2pHdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4ZTVmODBiOC1hZjJhLTQ4ZDgtODBlMC02ZjQwYjJjNDczMDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfemhOa1ZLa3ZuIiwiY29nbml0bzp1c2VybmFtZSI6IjhlNWY4MGI4LWFmMmEtNDhkOC04MGUwLTZmNDBiMmM0NzMwNyIsIm9yaWdpbl9qdGkiOiJlNjE5OTY0My0yMDJjLTRkZTctOTJlNC00OTZmOGY2ZTdjZjEiLCJhdWQiOiJhMzcwYjhrczBxbW01MDI2NzVtYnE3amdpIiwiZXZlbnRfaWQiOiIyNWRlNGE5Zi0zNjdkLTQwYTUtODI2ZC1hYTIwNTE1NGJkZTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY4NTQzMTA1MywiZXhwIjoxNjg1NDM0NjUzLCJpYXQiOjE2ODU0MzEwNTMsImp0aSI6IjE0NmU1YzI3LWY5M2YtNDY3MS1iOGMwLTI5MjFhMTZmZDkyNSIsImVtYWlsIjoiYWJjZGUxMzEyMzEyMkB5b3BtYWlsLmNvbSJ9.YgIyzThWR1fAb0UFzTUg3dhA02qfnLQxo-n0Wn4WdPqikq6OJjJ8LiEtJTFPyO0LcvDAxSMXYc2jPmk3bXdRm00J5wikD4YviWkyMBcawmpdMuZvunhFo0bucUMF4qzU_dMOI-GriPnUhhIKOU78RRxW6l8zgmyVy8euRZ2sw3BvY29W80DQLnQ01q7Li5JRgI6EOX8Y_qwmzFKUI4NSr-WH0dd1Wb6U4qADYOL7BpS3yyiJv7RGLKwVCEg1VVIa3cRiXGKURrjbPe_H_Qtxuy6gtur30KNnT7glgrVqpAp_t-jT8Ufu5GrwnvHnLcMkNs876KRJadMeI2zaD5kxQQ",
    },
  }),
});

const text = "Hello, world!";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const encodedText = encoder.encode(text);

const input = {
  // EncryptRequest
  KeyId: "de0ba744-9ecc-4d38-ac09-9d8f2124cd85", // required
  Plaintext: encodedText, // required
  // EncryptionContext: { // EncryptionContextType
  //   "<keys>": "STRING_VALUE",
  // },
  // GrantTokens: [ // GrantTokenList
  //   "STRING_VALUE",
  // ],
  EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
};
const command = new EncryptCommand(input);
const response = await client.send(command);
console.log(response);
const CiphertextBlob = response.CiphertextBlob;
// { // EncryptResponse
//   CiphertextBlob: "BLOB_VALUE",
//   KeyId: "STRING_VALUE",
//   EncryptionAlgorithm: "SYMMETRIC_DEFAULT" || "RSAES_OAEP_SHA_1" || "RSAES_OAEP_SHA_256" || "SM2PKE",
// };

const inputD = {
  // DecryptRequest
  CiphertextBlob: CiphertextBlob, // required
  KeyId: "de0ba744-9ecc-4d38-ac09-9d8f2124cd85",
  EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
};
const command2 = new DecryptCommand(inputD);
const response2 = await client.send(command2);
console.log(response2);
const x = decoder.decode(response2.Plaintext);
