"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlchemyPay = void 0;
var nftType_1 = require("./enum/nftType");
var signature_1 = require("./utils/signature");
var AlchemyPay = /** @class */ (function () {
    function AlchemyPay(_a) {
        var appId = _a.appId, appSecret = _a.appSecret, redirectUrl = _a.redirectUrl, callbackUrl = _a.callbackUrl, nftCheckoutEndpoint = _a.nftCheckoutEndpoint;
        this.appId = appId;
        this.appSecret = appSecret;
        this.redirectUrl = redirectUrl;
        this.callbackUrl = callbackUrl;
        this.nftCheckoutEndpoint = nftCheckoutEndpoint;
    }
    AlchemyPay.prototype.createPayment = function (_a) {
        var crypto = _a.crypto, cryptoAmount = _a.cryptoAmount, targetFiat = _a.targetFiat, merchantOrderNo = _a.merchantOrderNo, name = _a.name, picture = _a.picture, quantity = _a.quantity;
        try {
            if (!crypto ||
                !cryptoAmount ||
                !targetFiat ||
                !merchantOrderNo ||
                !name ||
                !picture ||
                !quantity) {
                throw new Error("Missing required parameters");
            }
            var timestamp = new Date().getTime();
            var timeout = new Date(timestamp + 1000 * 60 * 5).getTime();
            var paymentPayload = {
                appId: this.appId,
                callbackUrl: this.callbackUrl,
                crypto: crypto,
                cryptoAmount: cryptoAmount,
                merchantOrderNo: merchantOrderNo,
                name: name,
                picture: picture,
                quantity: quantity,
                redirectUrl: this.redirectUrl,
                targetFiat: targetFiat,
                timeout: timeout,
                timestamp: timestamp,
                type: nftType_1.NftType.MINT,
            };
            var dataSign = (0, signature_1.generateDataForSignature)(paymentPayload);
            var signature = (0, signature_1.generateSignature)(dataSign, this.appSecret);
            var encodedSignature = encodeURIComponent(signature);
            var paymentUrl = "".concat(this.nftCheckoutEndpoint, "?").concat(dataSign, "&signature=").concat(encodedSignature);
            return paymentUrl;
        }
        catch (error) {
            throw error;
        }
    };
    AlchemyPay.prototype.verifySignature = function (_a) {
        var amount = _a.amount, orderNo = _a.orderNo, quantity = _a.quantity, payTime = _a.payTime, signature = _a.signature, type = _a.type, merchantOrderNo = _a.merchantOrderNo, crypto = _a.crypto, payType = _a.payType, cryptoAmount = _a.cryptoAmount, appId = _a.appId, name = _a.name, transactionRate = _a.transactionRate, fiat = _a.fiat, status = _a.status;
        if (!amount ||
            !orderNo ||
            !quantity ||
            !payTime ||
            !signature ||
            !type ||
            !merchantOrderNo ||
            !crypto ||
            !payType ||
            !cryptoAmount ||
            !appId ||
            !name ||
            !transactionRate ||
            !fiat ||
            !status) {
            throw new Error("Invalid payload for signature verification");
        }
        var dataSign = (0, signature_1.generateDataForSignature)({
            amount: amount,
            orderNo: orderNo,
            quantity: quantity,
            payTime: payTime,
            type: type,
            merchantOrderNo: merchantOrderNo,
            crypto: crypto,
            payType: payType,
            cryptoAmount: cryptoAmount,
            appId: appId,
            name: name,
            transactionRate: transactionRate,
            fiat: fiat,
            status: status,
        });
        var verifySignature = (0, signature_1.generateSignature)(dataSign, this.appSecret);
        if (signature !== verifySignature) {
            throw new Error("Invalid signature");
        }
        return true;
    };
    return AlchemyPay;
}());
exports.AlchemyPay = AlchemyPay;
