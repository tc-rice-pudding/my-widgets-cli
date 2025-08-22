const url = window.location.href;
// 根据不同环境进行sso（Single Sign On） login页面跳转
// const envMap;
const envMap = {
  prod: {
    sso: `${url}/#/login`,
  },
  uat: {
    sso: `${url}/#/login`,
    // sso: 'https://uat-kf-uaa-admin.com/#/login'
  },
  dev: {
    sso: `${url}/#/login`,
    // sso: 'https://test-kf-uaa-admin.com/#/login'
  },
};

export default envMap;
