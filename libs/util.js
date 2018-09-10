'use strict';
/*
 * 
 * Created by pakison on 14/5/18
 */
module.exports = {
  getLastTimeByMonths(num) {
    const timestamp_now = new Date().getTime();
    const timestamp_last = timestamp_now - num * 30 * 24 * 3600 * 1000;
    return new Date(timestamp_last);
    // return time.getFullYear()+'-'+add0(time.getMonth()+1)+'-'+add0(time.getDay())+' '+
    //   add0(time.getHours())+':'+add0(time.getMinutes())+':'+add0(time.getSeconds());
  },
  formatDate(date){
    return date.getFullYear()+'-'+add0(date.getMonth()+1)+'-'+add0(date.getDate())+' '+
      add0(date.getHours())+':'+add0(date.getMinutes())+':'+add0(date.getSeconds());
  },
  formatDateBack8Hour(date){
    date = new Date(date.getTime() - 8*3600*1000);
    return date.getFullYear()+'-'+add0(date.getMonth()+1)+'-'+add0(date.getDate())+' '+
      add0(date.getHours())+':'+add0(date.getMinutes())+':'+add0(date.getSeconds());
  },
  getQuarterList(start_date) {
    let start_year = start_date.getFullYear();
    const now_year = new Date().getFullYear();
    const quarter_list = [];
    for(start_year;start_year<=now_year;start_year++) {
      for(let month = 0;month < 10; month = month +3){
        quarter_list.push([start_year,month,1])
      }
    }
    return quarter_list;
  },
  getMonthList(start,end){
    const list = [];
    let next = true;
    while(next) {
      const date = new Date(start);
      let month = date.getMonth();
      let year = date.getFullYear();
      if (month >= 11) {
        year += 1;
        month = -1;
      }
      const nextmonth = year + '-' + add0(month + 2) + '-01';
      list.push({start: start, end: nextmonth});
      start = nextmonth;
      if (nextmonth >= end)next=false;
    }
    return list;
  },
  fixfloat(floatnum, n) {
    const num = Math.pow(10, n);
    return Math.round(floatnum * num) / num;
  },
}
function add0(num) {
  return num<10 ? '0'+num : num;
}