import { IAlchemyPay } from "./type/alchemyPay.interface";
import { ICreatePaymentPayload } from "./type/createPayment.interface";
import { IVerifySignature } from "./type/verifySignature.interface";
export declare class AlchemyPay {
    private appId;
    private appSecret;
    private redirectUrl;
    private callbackUrl;
    private nftCheckoutEndpoint;
    constructor({ appId, appSecret, redirectUrl, callbackUrl, nftCheckoutEndpoint, }: IAlchemyPay);
    createPayment({ crypto, cryptoAmount, targetFiat, merchantOrderNo, name, picture, quantity, }: ICreatePaymentPayload): string;
    verifySignature({ amount, orderNo, quantity, payTime, signature, type, merchantOrderNo, crypto, payType, cryptoAmount, appId, name, transactionRate, fiat, status, }: IVerifySignature): boolean;
}
