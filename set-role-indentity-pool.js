import {
  CognitoIdentityClient,
  SetIdentityPoolRolesCommand,
} from "@aws-sdk/client-cognito-identity"; // ES Modules import
// const { CognitoIdentityClient, SetIdentityPoolRolesCommand } = require("@aws-sdk/client-cognito-identity"); // CommonJS import
const config = {
  region: "us-east-1",
};
const client = new CognitoIdentityClient(config);

export default async function set_role_identity(identityPoolId, role) {
  const input = {
    // SetIdentityPoolRolesInput
    IdentityPoolId: identityPoolId, // required
    Roles: {
      // RolesMap // required
      authenticated: role.Role.Arn, // ARN của vai trò dành cho người dùng xác thực
      unauthenticated: role.Role.Arn, // ARN của vai trò dành cho người dùng chưa xác thực
    },
    // RoleMappings: { // RoleMappingMap
    //   "<keys>": { // RoleMapping
    //     Type: "STRING_VALUE", // required
    //     AmbiguousRoleResolution: "STRING_VALUE",
    //     RulesConfiguration: { // RulesConfigurationType
    //       Rules: [ // MappingRulesList // required
    //         { // MappingRule
    //           Claim: "STRING_VALUE", // required
    //           MatchType: "STRING_VALUE", // required
    //           Value: "STRING_VALUE", // required
    //           RoleARN: "STRING_VALUE", // required
    //         },
    //       ],
    //     },
    //   },
    // },
  };
  const command = new SetIdentityPoolRolesCommand(input);
  return await client.send(command);
}
