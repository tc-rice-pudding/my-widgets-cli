/*
 * @Description:
 * @Author: djq
 * @Date: 2023-03-20 17:11:49
 * @LastEditTime: 2023-03-21 10:47:40
 * @LastEditors: djq
 */
import CryptoJS from "crypto-js";
import { sm2 } from "sm-crypto";
// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("tl#@fibVu#s%s221");
const IV = CryptoJS.enc.Utf8.parse("tl#@fibVu#s%s221");
const PUBLICKEY =
  "04f37f20ed36a600b51b34ac36d0bdc58be10c0818762969c8d167e645ff7044e26761e1e8eb5f7bc69c0918bf71a4ecc49944da967e4c20e65ded6c552bae0474";
const PRIVATEKEY =
  "530b1c1631f963c8247ebcbabbe99b92fe9561be0fa3dfe005b57493a3eabc1b";
// export const DESencrypt = (word) => {
//   let key = CryptoJS.enc.Utf8.parse(keys);
//   let srcs = CryptoJS.enc.Utf8.parse(word);
//   // 如果要用AES加密，就将下面这行DES改成AES 解密同理
//   let encrypted = CryptoJS.DES.encrypt(srcs, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return encrypted.toString();
// }

// /**
//  * 解密
//  */
// export const DESdecrypt = (word) => {
//   let key = CryptoJS.enc.Utf8.parse(keys);
//   // 如果要用AES解密，就将下面这行DES改成AES 加密同理
//   let decrypt = CryptoJS.DES.decrypt(word, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   });
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export const sm2Encrypt = (data) => {
  // 1 - C1C3C2，0 - C1C2C3，默认为1
  let cipherMode = 0;
  return "04" + sm2.doEncrypt(data, PUBLICKEY, cipherMode);
};

export const sm2Decrypt = (data) => {
  // 1 - C1C3C2，0 - C1C2C3，默认为1
  let cipherMode = 0;
  return sm2.doDecrypt(data, PRIVATEKEY, cipherMode);
};

export function Encrypt(word: string, keyStr: string = "", ivStr: string = "") {
  let key = KEY;
  let iv = IV;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }
  let datas = sm2Encrypt(word);

  let srcs = CryptoJS.enc.Utf8.parse(datas);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  let data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return data;
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export function Decrypt(word: string, keyStr: string = "", ivStr: string = "") {
  let key = KEY;
  let iv = IV;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);

  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  // let decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt.toString())
  // return decryptedStr;
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

  return sm2Decrypt(decryptedStr.toString().slice(2));
}
