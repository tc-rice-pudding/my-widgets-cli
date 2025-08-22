import loginApi from "@/core/api/login";

export const useSendCode = () => {
  const codeState = reactive({
    sendStatus: "init",
    time: 60,
    timer: -1 as any,
  });
  const sendCode = async ({ data, type }: any) => {
    // codeState.sendStatus = "sending";
    if (codeState.sendStatus == "padding") return;
    codeState.sendStatus = "loading";
    try {
      await loginApi.getMsgCode(data);
      codeState.sendStatus = "padding";
      codeState.timer = setInterval(() => {
        codeState.time--;
        if (codeState.time <= 0) {
          clearInterval(codeState.timer);
          codeState.sendStatus = "init";
          codeState.time = 60;
        }
      }, 1000);
    } catch (error) {
      codeState.sendStatus = "error";
    }
  };

  return {
    codeState,
    useMsgCode: sendCode,
  };
};
