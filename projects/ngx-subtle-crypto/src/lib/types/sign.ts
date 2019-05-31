export type SignAlgorithm = RsaPssParams | EcdsaParams | 'RSASSA-PKCS1-v1_5' | 'HMAC';
export type SignKey = CryptoKey;
export type SignStringForm = 'hexString';
export type DataToSign = string;
