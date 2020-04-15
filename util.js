const formatTime = (date, flag = true) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (flag) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
  return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
const getDateDiff = (dateTimeStamp) => {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;

  var d = new Date(dateTimeStamp); //根据时间戳生成的时间对象
  var g_year = d.getFullYear()
  var g_month = d.getMonth() + 1
  var g_day = d.getDate()

  if (g_month < 10) {
    g_month = '0' + g_month
  }
  if (g_day < 10) {
    g_day = '0' + g_day
  }
  console.log(g_year)
  /* var sss_year  = g_year.toString();
  console.log(sss_year)
  console.log(sss_year.substring(2)) */
  var y_date = g_year.toString().substring(2) + '-' + g_month + '-' + g_day
  var d_date = g_month + '-' + g_day
  /* console.log(y_date)
  console.log(d_date) */
  /* console.log('getDateDiff')
  console.log(y_date)
  console.log(d_date) */

  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      /*  result = "" + parseInt(monthC) + "月前"; */
      result = d_date
    else {
      /* result = "" + parseInt(monthC / 12) + "年前"; */
      result = y_date
    }
  } else if (weekC >= 1) {
    /* result = "" + parseInt(weekC) + "周前"; */
    result = d_date
  } else if (dayC >= 1) {
    if (dayC >= 4) {
      result = d_date
    } else {
      result = "" + parseInt(dayC) + "天前";
    }

  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
}
const getParams = function (url) {
  let params = {};
  if (url.includes('?')) {
    let list = url.split('?')[1].split('&');
    list.forEach(item => {
      params[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
  }
  return params;
};

module.exports = {
  formatTime: formatTime,
  getParams: getParams,
  getDateDiff: getDateDiff
}