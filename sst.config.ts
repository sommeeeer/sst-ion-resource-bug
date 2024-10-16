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
    let secrets: sst.Secret[] = [];
    for (let i = 1; i <= 200; i++) {
      secrets.push(new sst.Secret(`MySecret_${i}`));
    }
    const bucket = new sst.aws.Bucket("MyBucket");

    new sst.aws.Nextjs("MyWeb",
      {
        link: [secret, bucket, ...secrets],
        buildCommand: 'npx @opennextjs/aws@3.1.4 build',
      }
    );
  },
});
