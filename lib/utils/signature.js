"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = exports.generateDataForSignature = void 0;
var crypto = require("crypto");
function generateDataForSignature(payload) {
    var glue = "=";
    var separator = "&";
    return Object.keys(payload)
        .sort()
        .map(function (key) { return [key, payload[key]].join(glue); })
        .join(separator);
}
exports.generateDataForSignature = generateDataForSignature;
function generateSignature(dataSign, secret) {
    var hmac = crypto.createHmac("sha1", secret);
    var signature = hmac
        .update(Buffer.from(dataSign, "utf-8"))
        .digest("base64");
    return signature;
}
exports.generateSignature = generateSignature;
