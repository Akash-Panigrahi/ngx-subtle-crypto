export type VerifyAlgorithm = RsaPssParams | EcdsaParams | 'RSASSA-PKCS1-v1_5' | 'HMAC';
export type VerifyKey = CryptoKey;
export type VerifyStringForm = 'hexString';
export type VerifySignature = string;
export type DataToVerify = string;
