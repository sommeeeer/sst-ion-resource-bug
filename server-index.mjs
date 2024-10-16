if (process.env.SST_KEY_FILE) {
  const fullStart = new Date();
  const startImports = performance.now();
  const { readFileSync } = await import('fs');
  const { createDecipheriv } = await import('crypto');
  const endImports = performance.now();
  const startDecryption = performance.now();
  const startFile = performance.now();
  const key = Buffer.from(process.env.SST_KEY, 'base64');
  const encryptedData = readFileSync(process.env.SST_KEY_FILE);
  const endFile = performance.now();
  const nonce = Buffer.alloc(12, 0);
  const decipher = createDecipheriv('aes-256-gcm', key, nonce);
  const authTag = encryptedData.slice(-16);
  const actualCiphertext = encryptedData.slice(0, -16);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(actualCiphertext);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  const decryptedData = JSON.parse(decrypted.toString());
  globalThis.SST_KEY_FILE_DATA = decryptedData;
  const endDecryption = performance.now();
  const fullEnd = performance.now();
  const finish = fullEnd - fullStart;
  const imports = endImports - startImports;
  const decryption = endDecryption - startDecryption;
  const file = endFile - startFile;
  console.log('it all took:', finish);
  console.log('imports:', imports);
  console.log('decryption:', decryption);
  console.log('file:', file);
  globalThis.THDXR = JSON.stringify({
    finish,
    imports,
    decryption,
    file,
  });
}
export const handler = async (event, context) => {
  const { handler: rawHandler } = await import('./index.mjs');
  return rawHandler(event, context);
};
