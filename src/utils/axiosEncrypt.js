import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv 如果没有给
let  secretKey = window.globalConstant.secretKey || "Y/ICzMXlWqgvv7qx+83YRkkuMNLj9nJs"
const KEY = CryptoJS.enc.Utf8.parse(secretKey)
const IV = CryptoJS.enc.Utf8.parse(secretKey)
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }
  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export function Decrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  let base64 = CryptoJS.enc.Base64.parse(word)
  let src = CryptoJS.enc.Base64.stringify(base64)

  let decrypt = CryptoJS.AES.decrypt(src, key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  })

  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}


export function matchString(patterns = [], str="") {
  if(patterns.length < 1) return true;
  for (let pattern of patterns) {
    if (pattern.includes('**')) {
      // 如果模式中包含 '**'，则使用 indexOf 去匹配除去 '**' 的部分
      const prefix = pattern.replace(/\*\*/g, '');
      if (str.indexOf(prefix) > -1) {
        return true;
      }
    } else {
      // 如果模式中不包含 '**'，则进行全等匹配
      if (str === pattern) {
        return true;
      }
    }
  }
  return false;
}

export function excludeMatchString(patterns = [], str="") {
  for (let pattern of patterns) {
    if (pattern.includes('**')) {
      // 如果模式中包含 '**'，则使用 indexOf 去匹配除去 '**' 的部分
      const prefix = pattern.replace(/\*\*/g, '');
      if (str.indexOf(prefix) > -1) {
        return true;
      }
    } else {
      if (str.indexOf(pattern) > -1) {
        return true;
      }
      // 如果模式中不包含 '**'，则进行全等匹配
      // if (str === pattern) {
      //   return true;
      // }
    }
  }
  return false;
}