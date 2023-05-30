import { KMSClient, CreateKeyCommand } from "@aws-sdk/client-kms"; // ES Modules import
// const { KMSClient, CreateKeyCommand } = require("@aws-sdk/client-kms"); // CommonJS import

const config = {
  region: "us-east-1",
};
export default async function createKMSKey() {
  const client = new KMSClient(config);
  const input = {
    // CreateKeyRequest
    // Policy: "STRING_VALUE",
    Description: "THIS IS TEST",
    KeyUsage: "ENCRYPT_DECRYPT",
    // CustomerMasterKeySpec: "RSA_4096",
    KeySpec: "RSA_4096",
    Origin: "AWS_KMS",
    // CustomKeyStoreId: "STRING_VALUE",
    BypassPolicyLockoutSafetyCheck: false,
    // Tags: [
    //   // TagList
    //   {
    //     // Tag
    //     TagKey: "STRING_VALUE", // required
    //     TagValue: "STRING_VALUE", // required
    //   },
    // ],
    MultiRegion: false,
    // XksKeyId: "STRING_VALUE",
  };
  const command = new CreateKeyCommand(input);
  const response = await client.send(command);
  console.log(response);
  return response;
}

// const a = await createKMSKey();
// KeyMetadata: {
//     AWSAccountId: '390706210791',
//     Arn: 'arn:aws:kms:us-east-1:390706210791:key/9ead88e3-c62a-4e10-b53c-031959ef965e',
//     CreationDate: 2023-05-30T04:48:10.273Z,
//     CustomerMasterKeySpec: 'RSA_4096',
//     Description: 'THIS IS TEST',
//     Enabled: true,
//     EncryptionAlgorithms: [ 'RSAES_OAEP_SHA_1', 'RSAES_OAEP_SHA_256' ],
//     KeyId: '9ead88e3-c62a-4e10-b53c-031959ef965e',
//     KeyManager: 'CUSTOMER',
//     KeySpec: 'RSA_4096',
//     KeyState: 'Enabled',
//     KeyUsage: 'ENCRYPT_DECRYPT',
//     MultiRegion: false,
//     Origin: 'AWS_KMS'
//   }
//
