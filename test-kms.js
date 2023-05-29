import {KMSClient, EncryptCommand, DecryptCommand} from "@aws-sdk/client-kms";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers"; // ES Modules import
// const { KMSClient, EncryptCommand } = require("@aws-sdk/client-kms"); // CommonJS import

const REGION = 'us-east-1'
const IDENTITY_POOL_ID = "us-east-1:013345fb-efc9-44e8-a21f-bfb0e5c8c877"
const USER_POOL_ID = "us-east-1_ySDHMvtdl"


const client = new KMSClient({
    region: 'us-east-1',
    credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
    identityPoolId: IDENTITY_POOL_ID,
    logins: {
            [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`] : 'eyJraWQiOiJcL0k3REczUFZ2UTdRR1JKRm82MEswZ1c5S3ljc1ljNmhSRFRKTTBTbFwvR2c9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjN2MyZWFjNS1iNWMyLTRhODQtYWY4MS0xYzFiMWM2MDlmNWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfeVNESE12dGRsIiwiY29nbml0bzp1c2VybmFtZSI6ImM3YzJlYWM1LWI1YzItNGE4NC1hZjgxLTFjMWIxYzYwOWY1YSIsIm9yaWdpbl9qdGkiOiJjNWVkZWNhYi1jMjA3LTQwYmQtYjFkZi05Y2YzNmY0NWFjMzgiLCJhdWQiOiJka2VpcWNhdWNldGFlaXAwaThzY3F0NmVrIiwiZXZlbnRfaWQiOiI3NzZlMTE4Yi02M2E2LTRiYWEtYThmNC00ZWMxMDBjZjM5NWEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY4NTMzMDEwMiwiZXhwIjoxNjg1MzMzNzAyLCJpYXQiOjE2ODUzMzAxMDIsImp0aSI6IjhlMWVjZDg3LWEzOGYtNGQ1Ni1hMDVkLWFjYTYxZjY5ZTFhOSIsImVtYWlsIjoiYWJjZGUxMzEyMzEyMkB5b3BtYWlsLmNvbSJ9.fQcVlhjFsZN3rYc8ShmxdspklDGUfq9XnWhPuSek0i2XJy14peULzdQ_GakdJFxG_OIBOmbbYJ2ZagqpWfjK_WNCl6ODuJU76_JoNRzZRxcSbFTjyGJd_hfHGe5tLFUz8-EHQAWz_utS9JZaudkP6KhTRWCA9ekKFZmeT2p0iArHbghyT9yETneT_GCDVnjURYLR_fST09ONJfCwrRecgtXpoDZuGGdAFA-EczDeAR-sJ-2ogej0bJSnCOA1UlSn8lFhVCw3ym7h65n5cUnAIH9El9UZ8xhWF9DWkkXrgOj2puplAtlmQASeqJFH0DAmm0ZwXRiE-QMaaUbJkGjFRw'
        },
  })
});

const text = 'Hello, world!';
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const encodedText = encoder.encode(text);


const input = { // EncryptRequest
  KeyId: "6bf39a35-8294-4986-a56c-1da1656445cf", // required
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
console.log(response)
const CiphertextBlob = response.CiphertextBlob
// { // EncryptResponse
//   CiphertextBlob: "BLOB_VALUE",
//   KeyId: "STRING_VALUE",
//   EncryptionAlgorithm: "SYMMETRIC_DEFAULT" || "RSAES_OAEP_SHA_1" || "RSAES_OAEP_SHA_256" || "SM2PKE",
// };



const inputD = { // DecryptRequest
  CiphertextBlob: CiphertextBlob, // required
  KeyId: "6bf39a35-8294-4986-a56c-1da1656445cf",
  EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
};
const command2 = new DecryptCommand(inputD);
const response2 = await client.send(command2);
console.log(response2)
const x = decoder.decode(response2.Plaintext)