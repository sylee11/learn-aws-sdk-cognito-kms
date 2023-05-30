import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import createClientForDefaultRegion from "./index.js";

/** snippet-start:[javascript.v3.cognito-idp.actions.InitiateAuth] */
const initiateAuth = async ({ username, password, clientId }) => {
  const client = createClientForDefaultRegion(CognitoIdentityProviderClient);

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId,
  });

  return client.send(command);
};
/** snippet-end:[javascript.v3.cognito-idp.actions.InitiateAuth] */
const a = await initiateAuth({
  username: "abcde13123122@yopmail.com",
  password: "Admin@123456",
  clientId: "a370b8ks0qmm502675mbq7jgi",
});
console.log(a);
export { initiateAuth };
