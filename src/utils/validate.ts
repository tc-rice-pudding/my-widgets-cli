/**
 *
 * @param {*} value
 * @param {*} callback
 */
export const onlyPhone = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入手机号"));
  }
  const regPhone = /^(?:(?:\+|00)86)?1\d{10}$/;
  if (regPhone.test(value) === false) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
export const avlidtePwd = (rule: any, value: string, callback: any) => {
  const regPwd =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F])[\da-zA-Z\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]{8,}$/;
  if (regPwd.test(value) === false) {
    callback(new Error("密码必须包含大小写字母、数字、特殊字符且至少8位"));
  } else {
    callback();
  }
};
/**
 * 身份证号验证
 */
export const onlyIdCard = (value: string, callback: Function) => {
  // eslint-disable-next-line prefer-regex-literals
  const regName = new RegExp(
    /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  );
  if (regName.test(value) === false) {
    callback(new Error("请输入正确的身份证号"));
  } else {
    callback();
  }
};

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url: string) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}
export const onlyEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请输入邮件"));
  }
  const regNumC =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regNumC.test(value) === false) {
    callback(new Error("请输入正确的邮件地址"));
  } else {
    callback();
  }
};

/**
 * @param {string} url
 * @returns {Boolean}
 */
export const validHttpURL = (rule: any, value: string, callback: any) => {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  if (reg.test(value) === false) {
    callback(new Error("请输入正确的网站地址"));
  } else {
    callback();
  }
};

/**
 *  只能输入字母 汉字 数字 不可输入任何特殊字符
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */

export var noSpecialCharacter = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请输入昵称"));
  }
  const regNum = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
  if (regNum.test(value) === false) {
    callback(new Error("请勿输入特殊字符"));
  } else {
    callback();
  }
};

export const checkPwd = (rule: any, value: any, callback: any) => {
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
  if (!reg.test(value)) {
    return callback(
      new Error("8-14位， 字母、数字、特殊字符 2种或两种以上组合")
    );
  }
  return callback();
};

/**
 *  中文姓名两个字以上
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const avlidteName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入姓名"));
  }
  let reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/;
  if (!reg.test(value)) {
    return callback(new Error("请输入正确的姓名"));
  }
  return callback();
};