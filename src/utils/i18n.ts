const data = {
  lang: ["cn", "en"],
  default: "cn",
  text: {
    title: {
      cn: "2048",
      en: "2048"
    },
    score: {
      cn: "得分",
      en: "SCORE"
    },
    noRecord: {
      cn: "无记录",
      en: "NR"
    },
    best: {
      cn: "最佳",
      en: "BEST"
    },
    undo: {
      cn: "撤销",
      en: "UNDO"
    },
    reset: {
      cn: "重置",
      en: "RESET"
    },
    tipContent: {
      cn: "使用键盘箭头键或者滑动屏幕控制方块;反悔了？点回退按钮回退到上一步的状态。",
      en:
        "Use keyboard arrow keys or touchmove control blocks;Click undo button to revert to last step status if you regrets"
    }
  }
};

const lang = (() => {
  let lan = navigator.language
  lan = lan === "zh-CN" ? "cn" : lan;
  lan = lan === "en-US" ? "en" : lan;
  lan = ["cn", "en"].indexOf(lan) > -1 ? lan : data.default; // Set default language
  return lan;
})();

const text: any = {}
Object.keys(data.text).map(key => {
  text[key] = data.text[key][lang]
})
  // Object.defineProperty(text, key, {
  //   get: () => data.text[key][lang]
  // })
// );

export default text;