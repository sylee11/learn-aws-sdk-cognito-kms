import createClientForDefaultRegion from "./index.js";
import {CognitoIdentityProviderClient, SignUpCommand} from "@aws-sdk/client-cognito-identity-provider";

const signUp = async ({ clientId, username, password, email }) => {
  const client = createClientForDefaultRegion(CognitoIdentityProviderClient);

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return client.send(command);
};

const a =  await signUp({
email: 'abcde13123122@yopmail.com',
username: 'abcde13123122@yopmail.com',
 password: "Admin@123456", 
 clientId: 'dkeiqcaucetaeip0i8scqt6ek',
  })
console.log(a)