import createKMSKey from "./create_kms_key.js";
import createUserPool, { createUserPoolClient } from "./create-user-pool.js";
import createIdentityPool from "./create-indentity-pool.js";
import { signUp } from "./sigup.js";

const kmsKey = await createKMSKey();
const userPool = await createUserPool("test-123");
const userPoolClient = await createUserPoolClient(userPool.UserPool.Id, "test"); // res.UserPoolClient.ClientId
const identityPool = await createIdentityPool({
  roleName: "test-123",
  IdentityPoolName: "test-123",
  userPoolId: userPool.UserPool.Id,
  clientId: userPoolClient.UserPoolClient.ClientId,
  keyKMS: kmsKey.KeyMetadata.Arn,
});

const sign = await signUp({
  email: "abcde13123122@yopmail.com",
  username: "abcde13123122@yopmail.com",
  password: "Admin@123456",
  clientId: userPoolClient.UserPoolClient.ClientId,
});

console.log(sign);
