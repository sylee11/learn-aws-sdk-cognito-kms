import { CognitoIdentityProviderClient, CreateUserPoolCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
// const { CognitoIdentityProviderClient, CreateUserPoolCommand } = require("@aws-sdk/client-cognito-identity-provider"); // CommonJS import
const config = {
    region: "us-east-1"
}
const client = new CognitoIdentityProviderClient(config);
const input = { // CreateUserPoolRequest
  PoolName: "web3", // required
  Policies: { // UserPoolPolicyType
    PasswordPolicy: { // PasswordPolicyType
      MinimumLength: Number("8"),
      RequireUppercase: true,
      RequireLowercase: true,
      RequireNumbers: true,
      RequireSymbols: true,
      // TemporaryPasswordValidityDays: Number("int"),
    },
  },
  DeletionProtection: "ACTIVE",
  // LambdaConfig: { // LambdaConfigType
  //   PreSignUp: "STRING_VALUE",
  //   CustomMessage: "STRING_VALUE",
  //   PostConfirmation: "STRING_VALUE",
  //   PreAuthentication: "STRING_VALUE",
  //   PostAuthentication: "STRING_VALUE",
  //   DefineAuthChallenge: "STRING_VALUE",
  //   CreateAuthChallenge: "STRING_VALUE",
  //   VerifyAuthChallengeResponse: "STRING_VALUE",
  //   PreTokenGeneration: "STRING_VALUE",
  //   UserMigration: "STRING_VALUE",
    // CustomSMSSender: { // CustomSMSLambdaVersionConfigType
    //   LambdaVersion: "V1_0", // required
    //   LambdaArn: "STRING_VALUE", // required
    // },
    // CustomEmailSender: { // CustomEmailLambdaVersionConfigType
    //   LambdaVersion: "V1_0", // required
    //   LambdaArn: "STRING_VALUE", // required
    // },
    // KMSKeyID: "STRING_VALUE",
  // },
  AutoVerifiedAttributes: [ // VerifiedAttributesListType
    "email",
  ],
  // AliasAttributes: [ // AliasAttributesListType
  //   "email",
  // ],
  UsernameAttributes: [ // UsernameAttributesListType
    "email",
  ],
  // SmsVerificationMessage: "STRING_VALUE",
  // EmailVerificationMessage: "STRING_VALUE",
  // EmailVerificationSubject: "STRING_VALUE",
  // VerificationMessageTemplate: { // VerificationMessageTemplateType
  //   SmsMessage: "STRING_VALUE",
  //   EmailMessage: "STRING_VALUE",
  //   EmailSubject: "STRING_VALUE",
  //   EmailMessageByLink: "STRING_VALUE",
  //   EmailSubjectByLink: "STRING_VALUE",
  //   DefaultEmailOption: "CONFIRM_WITH_LINK" || "CONFIRM_WITH_CODE",
  // },
  // SmsAuthenticationMessage: "STRING_VALUE",
  MfaConfiguration: "OFF",
  UserAttributeUpdateSettings: { // UserAttributeUpdateSettingsType
    AttributesRequireVerificationBeforeUpdate: [ // AttributesRequireVerificationBeforeUpdateType
      "email",
    ],
  },
  // DeviceConfiguration: { // DeviceConfigurationType
  //   ChallengeRequiredOnNewDevice: true || false,
  //   DeviceOnlyRememberedOnUserPrompt: true || false,
  // },
  // EmailConfiguration: { // EmailConfigurationType
  //   SourceArn: "STRING_VALUE",
  //   ReplyToEmailAddress: "STRING_VALUE",
  //   EmailSendingAccount: "COGNITO_DEFAULT" || "DEVELOPER",
  //   From: "STRING_VALUE",
  //   ConfigurationSet: "STRING_VALUE",
  // },
  // SmsConfiguration: { // SmsConfigurationType
  //   SnsCallerArn: "STRING_VALUE", // required
  //   ExternalId: "STRING_VALUE",
  //   SnsRegion: "STRING_VALUE",
  // },
  UserPoolTags: { // UserPoolTagsType
    "ssss": "TEST",
  },
  // AdminCreateUserConfig: { // AdminCreateUserConfigType
  //   AllowAdminCreateUserOnly: true || false,
  //   UnusedAccountValidityDays: Number("int"),
  //   InviteMessageTemplate: { // MessageTemplateType
  //     SMSMessage: "STRING_VALUE",
  //     EmailMessage: "STRING_VALUE",
  //     EmailSubject: "STRING_VALUE",
  //   },
  // },
  Schema: [ // SchemaAttributesListType
    { // SchemaAttributeType
      Name: "company",
      AttributeDataType: "String",
      DeveloperOnlyAttribute: false,
      Mutable: true,
      Required: false,
    },
  ],
  // UserPoolAddOns: { // UserPoolAddOnsType
  //   AdvancedSecurityMode: "OFF" || "AUDIT" || "ENFORCED", // required
  // },
  // UsernameConfiguration: { // UsernameConfigurationType
  //   CaseSensitive: true || false, // required
  // },
  // AccountRecoverySetting: { // AccountRecoverySettingType
  //   RecoveryMechanisms: [ // RecoveryMechanismsType
  //     { // RecoveryOptionType
  //       Priority: Number("int"), // required
  //       Name: "verified_email" || "verified_phone_number" || "admin_only", // required
  //     },
  //   ],
  // },
};
const command = new CreateUserPoolCommand(input);
const response = await client.send(command);
