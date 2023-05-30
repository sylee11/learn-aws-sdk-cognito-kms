/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ConfirmSignUpCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import createClientForDefaultRegion from "./index.js";

/** snippet-start:[javascript.v3.cognito-idp.actions.ConfirmSignUp] */
const confirmSignUp = async ({ clientId, username, code }) => {
  const client = createClientForDefaultRegion(CognitoIdentityProviderClient);

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: username,
    ConfirmationCode: code,
  });

  return client.send(command);
};
/** snippet-end:[javascript.v3.cognito-idp.actions.ConfirmSignUp] */

// export { confirmSignUp };356697
const a = await confirmSignUp({
  username: "abcde13123122@yopmail.com",
  code: "102951",
  clientId: "a370b8ks0qmm502675mbq7jgi",
});

console.log(a);
