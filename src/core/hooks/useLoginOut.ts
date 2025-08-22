const loginCallback = (window as any).globalConstant.loginCallback;
export const useLoginOut = () => {
  window.location.replace(loginCallback);
};
