/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-ion-resource-bug",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const secret = new sst.Secret("MySecret");
    const bucket = new sst.aws.Bucket("MyBucket");

    new sst.aws.Nextjs("MyWeb",
      {
        link: [secret, bucket],
        buildCommand: 'npx @opennextjs/aws@3.1.4 build'
      }
    );
  },
});
