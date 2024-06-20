import { NftType } from "./enum/nftType.interface";
import { IAlchemyPay } from "./type/alchemyPay.interface";
import { ICreatePaymentPayload } from "./type/createPayment.interface";
import { generateDataForSignature, generateSignature } from "./utils/signature";

export class AlchemyPay {
  private appId: string;
  private appSecret: string;
  private redirectUrl: string;
  private callbackUrl: string;
  private nftCheckoutEndpoint: string;
  constructor({
    appId,
    appSecret,
    redirectUrl,
    callbackUrl,
    nftCheckoutEndpoint,
  }: IAlchemyPay) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.redirectUrl = redirectUrl;
    this.callbackUrl = callbackUrl;
    this.nftCheckoutEndpoint = nftCheckoutEndpoint;
  }

  public async createPayment({
    crypto,
    cryptoAmount,
    targetFiat,
    merchantOrderNo,
    name,
    picture,
    quantity,
  }: ICreatePaymentPayload) {
    try {
      if (
        !crypto ||
        !cryptoAmount ||
        !targetFiat ||
        !merchantOrderNo ||
        !name ||
        !picture ||
        !quantity
      ) {
        throw new Error("Missing required parameters");
      }

      const timestamp = new Date().getTime();
      const timeout = new Date(timestamp + 1000 * 60 * 5).getTime();

      const paymentPayload = {
        appId: this.appId,
        callbackUrl: this.callbackUrl,
        crypto,
        cryptoAmount,
        merchantOrderNo,
        name,
        picture,
        quantity,
        redirectUrl: this.redirectUrl,
        targetFiat,
        timeout,
        timestamp,
        type: NftType.MINT,
      };

      const dataSign = generateDataForSignature(paymentPayload);
      const signature = generateSignature(dataSign, this.appSecret);
      const encodedSignature = encodeURIComponent(signature);

      const paymentUrl = `${this.nftCheckoutEndpoint}?${dataSign}&signature=${encodedSignature}`;
      return paymentUrl;
    } catch (error) {
      throw error;
    }
  }
}
