const disabled = ref(false);

export const useCronDisabled = () => {
  const setCronOperStatus = (flag: boolean) => {
    disabled.value = flag;
  };

  return { isDisabled: disabled, setCronOperStatus };
};
