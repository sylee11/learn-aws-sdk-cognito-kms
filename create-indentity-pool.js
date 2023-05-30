import {
  CognitoIdentityClient,
  CreateIdentityPoolCommand,
} from "@aws-sdk/client-cognito-identity";
import create_role from "./create-role.js";
import set_role_identity from "./set-role-indentity-pool.js"; // ES Modules import
// const { CognitoIdentityClient, CreateIdentityPoolCommand } = require("@aws-sdk/client-cognito-identity"); // CommonJS import
const config = {
  region: "us-east-1",
};
export default async function createIdentityPool({
  roleName,
  IdentityPoolName,
  userPoolId,
  clientId,
  keyKMS,
}) {
  const client = new CognitoIdentityClient(config);

  const role = await create_role(roleName, keyKMS);
  const input = {
    // CreateIdentityPoolInput
    IdentityPoolName: IdentityPoolName, // required
    AllowUnauthenticatedIdentities: false, // required
    // AllowClassicFlow: true || false,
    // SupportedLoginProviders: { // IdentityProviders
    //   "cognito": "cognito",
    // },
    // DeveloperProviderName: "STRING_VALUE",
    // OpenIdConnectProviderARNs: [ // OIDCProviderList
    //   "STRING_VALUE",
    // ],
    CognitoIdentityProviders: [
      // CognitoIdentityProviderList
      {
        // CognitoIdentityProvider
        ProviderName: `cognito-idp.${config.region}.amazonaws.com/${userPoolId}`,
        ClientId: clientId,
        ServerSideTokenCheck: false,
      },
    ],
  };
  const command = new CreateIdentityPoolCommand(input);
  const response = await client.send(command);
  const rs = await set_role_identity(response.IdentityPoolId, role);
  return rs;
  // console.log(response);
  // console.log(rs);
}
