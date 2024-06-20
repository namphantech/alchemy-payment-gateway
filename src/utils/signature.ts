const crypto = require("crypto");
export function generateDataForSignature(payload: any): string {
  const glue = "=";
  const separator = "&";
  return Object.keys(payload)
    .sort()
    .map((key) => [key, payload[key]].join(glue))
    .join(separator);
}
export function generateSignature(dataSign: any, secret: string): string {
  const hmac = crypto.createHmac("sha1", secret);
  const signature = hmac
    .update(Buffer.from(dataSign, "utf-8"))
    .digest("base64");

  return signature;
}
