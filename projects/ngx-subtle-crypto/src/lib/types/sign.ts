export interface cRsaPssParams extends RsaPssParams {
    name: 'RSA-PSS',
    saltLength: number
};

export type SignAlgorithm = RsaPssParams | EcdsaParams | 'RSASSA-PKCS1-v1_5' | 'HMAC';