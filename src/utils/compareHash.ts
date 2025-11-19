import crypto from 'crypto';

export function verifyBlingSignature(rawBody: Buffer, headerSignature:string | undefined, clientSecret:string):boolean {
    if (!headerSignature || !headerSignature.startsWith("sha256=")) {
        return false;
    }

    const receivedHash = headerSignature.replace("sha256=", "");

    const generatedHash = crypto
        .createHmac("sha256", clientSecret)
        .update(rawBody)
        .digest("hex");

    return generatedHash === receivedHash;
}