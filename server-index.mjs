if (process.env.SST_KEY_FILE) {
  const start = new Date();
  const { readFileSync } = await import("fs")
  const { createDecipheriv } = await import("crypto")
  const key = Buffer.from(process.env.SST_KEY, "base64");
  const encryptedData = readFileSync(process.env.SST_KEY_FILE);
  const nonce = Buffer.alloc(12, 0);
  const decipher = createDecipheriv("aes-256-gcm", key, nonce);
  const authTag = encryptedData.slice(-16);
  const actualCiphertext = encryptedData.slice(0, -16);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(actualCiphertext);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const decryptedData = JSON.parse(decrypted.toString());
  globalThis.SST_KEY_FILE_DATA = decryptedData;
  const finish = new Date()-start;
  console.log("it took:", finish);
  globalThis.THDXR = finish;
}
export const handler = async (event, context) => {
  const { handler: rawHandler} = await import("./index.mjs");
  return rawHandler(event, context);
};