(function (doc, win) {
  var docEl = doc.documentElement,
    //orientationchange  苹果公司为移动 Safari中添加了 orientationchange 事件，以便开发人员能够确定用户何时将设 备由横向查看模式切换为纵向查看模式。移动 Safari的 window.orientation 属性中可能包含 3个值： 0 表示肖像模式，90 表示向左旋转的横向模式（“主屏幕”按钮在右侧），-90 表示向右旋转的横向模 式（“主屏幕”按钮在左侧）。
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      var dpr = window.devicePixelRatio;
      // console.log(dpr);
      // console.log(win.screen.width);
      // console.log(clientWidth);

      // 思路： 如果公司的设计稿是按照iphone6的分辨率来设定的(750 * 1334)
      // 问题：当前获取的clientWidth是视觉视口宽度(设备逻辑像素), 如果不设定viewport=device-width，获取的恒定980
      // 如何获取设备的真实分辨率呢？ 设备逻辑像素 * dpr
      if (!clientWidth) return;
      if(clientWidth>=375){
        // 根据clientWidth & 阿里的适配方案考虑rem适配
        fontSize = 100;
        // 如果设计稿是750的话，再考虑视网膜屏幕的dpr值，在高分辨率下显示的内容样式也是等比清晰
        // docEl.style.fontSize = fontSize / dpr + 'px';
        docEl.style.fontSize = fontSize + 'px';
      }else{
        fontSize = 100 * (clientWidth / 375) + 'px';
        docEl.style.fontSize = fontSize;
      }
    };

  if (!doc.addEventListener) return;
  // 绑定事件 浏览器窗口大小发生改变
  win.addEventListener(resizeEvt, recalc, false);
  // 文档内容加载完毕
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

