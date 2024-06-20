import { PaymentStatus } from "../enum/paymentStatus";
export interface IVerifySignature {
    amount: string;
    orderNo: string;
    quantity: string;
    payTime: string;
    signature: string;
    type: string;
    merchantOrderNo: string;
    crypto: string;
    payType: string;
    cryptoAmount: string;
    appId: string;
    name: string;
    transactionRate: string;
    fiat: string;
    status: PaymentStatus;
}
