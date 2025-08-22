import moment from "moment";
// 时间戳格式化
export const timestampToTime = (timestamp: number) => {
  return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
};
// nowTime 格式化
export const nowDateToTime = (format = "YYYY-MM-DD HH:mm") => {
  return moment().format(format);
};
// 手机号 身份证号+*
export const maskPersonalInfo = (str: string, start = 3, end = 7) => {
  let salt = "";

  if (!str) {
    return "";
  }
  if (!Number(start) || !Number(end)) {
    // 必须为number类型
    return str;
  }
  // const temp = str.substring(start, end);
  for (let i = 0; i < end - start; i += 1) {
    salt += "*";
  }
  // const data = str.replace(temp, salt);//这种方式 类似18818818888 特殊号码无法截取
  const data = str.substr(0, start) + salt + str.substr(end);
  return data;
};
// 对api参数map
export const mapApiParams = ({ queryId, params, dbSource, type }: any) => {
  return {
    queryId,
    dbSource,
    type,
    params,
  };
};
// 导出excel
export const excelExport = (file) => {
  const link = document.createElement("a");
  const blob = new Blob([file.content], { type: "application/vnd.ms-excel" });
  link.style.display = "none";
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${file.name}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// 获取url参数
export const GetQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

//随机生成密码

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

export const generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  //Object.values(item)[0] 获取数组中每个对象的值
  // 筛选出值为true(状态为选中的)的大写英文字母、小写英文字母、数字、特殊符号
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // 状态都为未选中，则都为flase，加起来就是0；直接返回
  if (typesCount === 0) {
    return false;
  }

  for (let i = 0; i < length; i += typesCount) {
    // 遍历循环状态为选中的对象组成的数组，获取每个对象的属性名，根据属性名调用各自生成函数
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  // 截取选择的密码位数长度的随机密码
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
};
