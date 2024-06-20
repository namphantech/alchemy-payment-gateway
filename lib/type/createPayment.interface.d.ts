export interface ICreatePaymentPayload {
    crypto: string;
    cryptoAmount: string;
    targetFiat: string;
    merchantOrderNo: string;
    name: string;
    picture: string;
    quantity: string;
}
