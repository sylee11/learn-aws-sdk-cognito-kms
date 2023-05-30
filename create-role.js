import {
  IAMClient,
  CreateRoleCommand,
  AttachRolePolicyCommand,
  CreatePolicyCommand,
} from "@aws-sdk/client-iam"; // ES Modules import
// const { IAMClient, CreateRoleCommand } = require("@aws-sdk/client-iam"); // CommonJS import
const config = {
  region: "us-east-1",
};
const client = new IAMClient(config);

const create_role = async (roleName, keyKMS) => {
  const input = {
    // CreateRoleRequest
    // Path: "STRING_VALUE",
    RoleName: roleName, // required
    AssumeRolePolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Federated: "cognito-identity.amazonaws.com",
          },
          Action: "sts:AssumeRoleWithWebIdentity",
        },
      ],
    }),
  };

  const command = new CreateRoleCommand(input);
  const role = await client.send(command);
  console.log("role", role);

  const policy = await create_policy(roleName, keyKMS);
  console.log("policy", policy);

  const acc = await attach(role, policy);
  console.log("acccccc", acc);
  return role;
};

const create_policy = async (PolicyName, keyKMS) => {
  // create policy
  const input = {
    // CreatePolicyRequest
    PolicyName: PolicyName, // required
    // Path: "STRING_VALUE",
    PolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "kms:Encrypt",
          Resource: keyKMS,
        },
      ],
    }),
  };
  const command_3 = new CreatePolicyCommand(input);
  return await client.send(command_3);
};

const attach = async (role, policy) => {
  // attach to role
  const input_2 = {
    // AttachRolePolicyRequest
    RoleName: role.Role.RoleName, // required role.Role.RoleName
    PolicyArn: policy.Policy.Arn, // required policy.Policy.Arn
  };
  const command2 = new AttachRolePolicyCommand(input_2);
  return await client.send(command2);
};

export default create_role;
