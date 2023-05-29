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

// const a = await initiateAuth({username: 'tesava22vsfs2222@yopmail.com', password: "Admin@123456123", clientId: '1nufhtahtg7vp3m09b68pvpoot'})
const credentical = fromCognitoIdentityPool({
    clientConfig: { region: REGION }, // Configure the underlying CognitoIdentityClient.
    identityPoolId: IDENTITY_POOL_ID,
    logins: {
            ['accounts.google.com'] : 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDU5Nzc4NDEyMjgtb244Y3J2NWxlNjZlbTJyYzZubW84aDhqOGkzbTlxNTcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQwMzc3MTc1ODI5MDgwNDU5NTUiLCJlbWFpbCI6ImRlbHluYXJhYmVsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiMXAwT3IyN3ZPYVNFTmYtSXRqd2pkdyIsIm5hbWUiOiJKYXNoaWEgTWF2ZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZWpHSXhFeWU0N3VFMHR3ckFUaV9YY3o4U2ZRVDQ0cWNBamFaN3A9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFzaGlhIiwiZmFtaWx5X25hbWUiOiJNYXZlcyIsImxvY2FsZSI6InZpIiwiaWF0IjoxNjg1MzMxNjY1LCJleHAiOjE2ODUzMzUyNjV9.Ael6MKn1YycMIPVegw9_DamZrVUf-AXhuHDgI5Z_l9YXnv3TP9pfmCS6C-PJH_p4MSkQ2Clv31WsfujSEq_3WXUvjb3t1SC8iVpsrPBj-g7Y03H7VMvpZp1wd202poHtk_hFrJkgK_46oH6EVBLGHoOfMuGYI9SgHr7KghbINCv7j_eFSMAqDXeCFN62PUKsCEedT528_vTEsfPz0XbY5D411SiewnuEJoyrMqoWWtSYPoWkALugEe7rGyfzErC43WfV3NmRxFvsBu2vExXah4HefGxVvzoarsk4GpHONh7Al8-hi4qmHA6yYJHldsKckBJKXNXSwQceE85Cge9slQ'
        },
  })

// credentical().then((s) => console.log(s) )

// const token = 'eyJraWQiOiJQRjhIVjNpVHMxWVwvNHVLa3ZuaGxSbzFTUlZSNm1vVjdEcXVidEJPRCtmWT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoidmdMOTVCMktsSm5KU1Q1UHpyT3RGdyIsInN1YiI6IjFiMDUzM2ZmLTE1ZTQtNDdjNC1iMTU1LWU2YTA4YmQwODMwNyIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV8zMG5WOEdKS2tfR29vZ2xlIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8zMG5WOEdKS2siLCJjb2duaXRvOnVzZXJuYW1lIjoiZ29vZ2xlXzEwNDAzNzcxNzU4MjkwODA0NTk1NSIsIm5vbmNlIjoiZXJVZ09BaEVTVURsMmhmZ3FaTmFpV29rYURvblc4RVhWVkw2SnRiUXB6Uy1RTUZwaUFPMndzTnhFQXR6WHozeXNMS0xrVzJYcUVTV2FHZGVpNzFaUDZZeHRsRVI2eWlBb25JSzJ1SkktMFFwTFJPdGpTSXY5VEpsVzRHd0FmeVJFYThzZkYyYXRtZU1KUVZHQVZDM0FvRldka0dhVFlhamdNeXFnSWhXMnFZIiwiYXVkIjoiMW51Zmh0YWh0Zzd2cDNtMDliNjhwdnBvb3QiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDQwMzc3MTc1ODI5MDgwNDU5NTUiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNjg0ODMxNzI0MDc1In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY4NDk4MjIzOCwiZXhwIjoxNjg0OTg1ODM4LCJpYXQiOjE2ODQ5ODIyMzgsImVtYWlsIjoiZGVseW5hcmFiZWxAZ21haWwuY29tIn0.b9XwZf8hkyAu5IY3B7K3ZmUnggnIGTr0jbMmxtvm23wP86k0kCVAKhbz-aq-x3P7LNso1MVc9IDp0mC5E_afkZZksZDFHMNLy07JfdD5LDeIt6dBvV-757sOhuJ6B541ccXDx4c6UpVGLVPklGvLTtjUE-0UvsKRlSTIMIBdzs0o-JRtP9Nz8_YJHcFz6BC0IrvIi87R29XJbSsNpl8dOI8UKX9JVJhIIiskH2MJEj2xYSA3e7vO9LC_SfIIfFLswRyQPNI7CPXZ1TRD0iWJ7PjLPiP3yoxXcD30kOVC-nE1zhMSWK3AIZKrxjmzczXTLaMS7mO9yj3ZfKOu_yD9iw'
const kmsClient = new KMSClient({
  region: REGION,
  credentials: credentical
});

// const text = 'Hello, world!';
// const encoder = new TextEncoder();
// const encodedText = encoder.encode(text);
//
// const input = { // EncryptRequest
//   KeyId: "6bf39a35-8294-4986-a56c-1da1656445cf", // required
//   Plaintext: encodedText, // required
//     EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
//
// };
// const command = new EncryptCommand(input);
// // console.log(co,)
// const response = await kmsClient.send(command);
// console.log(response)
//
