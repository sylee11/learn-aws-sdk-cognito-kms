import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";


import { curry, defaultTo } from "ramda";

const DEFAULT_REGION = "us-east-1";

const orDefaultRegion = defaultTo(DEFAULT_REGION);

const createClientForRegion = curry(
  (region, ClientConstructor) =>
    new ClientConstructor({ region: orDefaultRegion(region) })
);

const createClientForDefaultRegion = createClientForRegion(null);

export default createClientForDefaultRegion;