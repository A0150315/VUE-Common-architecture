store.dispatch('autoToast','提示语') 打开自动关闭的 Toast

store.dispatch('toast','提示语') 打开不自动关闭的 Toast

store.dispatch('closeToast') 关闭 Toast

store.dispatch('alert', { 打开 Alert
  title: "标题",
  main: "详情",
  btn: [
    {
      name: "取消"
    },
    {
      name: "确定",
      callback: () => {
        console.log("确定");
      },
      highLight: true
    }
  ]
});

vm.$http[name] 调用 Ajax 请求
