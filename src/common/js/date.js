export function formatDate(date, fmt) {
  /* if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }*/
  var mouth = date.getMonth() + 1;
  if (mouth < 10) {
    mouth = '0' + mouth;
  }
  var hour = date.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }
  var min = date.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  fmt = date.getFullYear() + '-' + mouth + '-' + date.getDate() + ' ' + hour + ':' + min;
/*  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp('(${k})').test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }*/
  return fmt;
};

/* function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}*/
