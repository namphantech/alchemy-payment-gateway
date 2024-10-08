# SDK Alchemy Payment Gateway

The sdk will make easily to integrate Alchemy Pay's NFT Checkout(crypto-based) feature to enable end users/customers to purchase NFTS using both cards and local payment methods worldwide in your application.

## Checkout Flow chart

![Flow](https://files.readme.io/26a2353-Flowchart-2.jpg)

## Installation
You need to contact to AlchemyPay to get account as merchant before.


```bash
yarn add alchemy-payment-gateway
```

## Integration

```typescript
import { AlchemyPay } from "alchemy-payment-gateway";


class AlchemyPaymentService {
  private readonly alchemyPayService: AlchemyPay;
  constructor(appId, appSecret, redirectUrl, callbackUrl, nftCheckoutEndpoint) {
    this.alchemyPayService = new AlchemyPay({
      appId,
      appSecret,
      redirectUrl,
      callbackUrl,
      nftCheckoutEndpoint,
    });
  }

  /* generate payment url for NFT checkout */
  public createPayment({
    crypto = "crypto type",
    cryptoAmount = "crypto amount to checkout",
    targetFiat = "fiat type",
    merchantOrderNo = "your orderId",
    name = "nft name",
    picture = "nft picture url",
    quantity = "quantity",
  }) {
    try {
      const paymentUrl = this.alchemyPayService.createPayment({
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

  /* verify webhook */
  public verifyPaymentResponse({
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
      const isValidSignature = this.alchemyPayService.verifySignature({
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

## Docs
- AlchemyPay Integration Document: https://alchemypay.readme.io/docs/introduction-4
- Details: https://alchemypay.org/



