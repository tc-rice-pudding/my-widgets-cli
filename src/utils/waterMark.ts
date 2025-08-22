const watermark = {} as any;

const setWatermark = (str: string) => {
  const id = "1.23452384164.123412415";
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as HTMLElement);
  }
  const can = document.createElement("canvas") as any;
  can.width = 250;
  can.height = 120;
  const cans = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = "14px Vedana";
  cans.fillStyle = "rgba(200, 200, 200, 0.30)";
  cans.textAlign = "left";
  cans.textBaseline = "Middle";
  cans.fillText(str, 0, can.height);
  const div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.position = "fixed";
  div.style.zIndex = "100000";
  div.style.width = `${document.documentElement.clientWidth}px`;
  div.style.height = `${document.documentElement.clientHeight}px`;
  div.style.background = `url(${can.toDataURL("image/png")}) left top repeat`;
  document.body.appendChild(div);
  return id;
};
// 该方法只允许调用一次
watermark.set = (str: string) => {
  let id = setWatermark(str);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str);
    }
  }, 500);
  window.onresize = () => {
    setWatermark(str);
  };
};

export default watermark;
