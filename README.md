# SDK Alchemy Payment Gateway

The sdk will make easily to integrate Alchemy Pay's NFT Checkout(crypto-based) feature to enable end users/customers to purchase NFTS using both cards and local payment methods worldwide in your application.

## Process flow

![Flow](https://files.readme.io/26a2353-Flowchart-2.jpg)

## Installation

You need to contact to AlchemyPay to get account as merchant before.
Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm i alchemy-payment-gateway
```

## Usage

```typescript
import { AlchemyPay } from "alchemy-payment-gateway";

/* 
nftCheckoutEndpoint: 
  sandbox:  https://nft-sbx.alchemytech.cc
  production: https://nftcheckout.alchemypay.org
*/
class AlchemyPaymentService {
  private alchemyPayment;
  constructor(appId, appSecret, redirectUrl, callbackUrl, nftCheckoutEndpoint) {
    this.alchemyPayment = new AlchemyPay({
      appId,
      appSecret,
      redirectUrl,
      callbackUrl,
      nftCheckoutEndpoint,
    });
  }

  /* generate payment url for NFT checkout action*/
  createPayment({
    crypto = "crypto type",
    cryptoAmount = "crypto amount to checkout",
    targetFiat = "fiat type",
    merchantOrderNo = "your orderId",
    name = "nft name",
    picture = "nft picture url",
    quantity = "quantity",
  }) {
    try {
      const paymentUrl = await this.alchemyPayment.createPayment({
        cryptoAmount,
        targetFiat,
        merchantOrderNo,
        name,
        picture,
        quantity,
      });
      return paymentUrl;
    } catch (error) {
      throw error;
    }
  }

  /* verify webhook request */
  verifyPaymentResponse({
    amount,
    orderNo,
    quantity,
    payTime,
    signature,
    type,
    merchantOrderNo,
    crypto,
    payType,
    cryptoAmount,
    appId,
    name,
    transactionRate,
    fiat,
    status,
  }) {
    try {
      const isValidSignature = this.alchemyPayment.verifySignature({
        amount,
        orderNo,
        quantity,
        payTime,
        signature,
        type,
        merchantOrderNo,
        crypto,
        payType,
        cryptoAmount,
        appId,
        name,
        transactionRate,
        fiat,
        status,
      });
      return isValidSignature;
    } catch (error) {
      throw error;
    }
  }
}
```
## Contact 
 Mail: phanvanhoainam22@gmail.com

