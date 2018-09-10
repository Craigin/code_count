'use strict';
/*
 * 
 * Created by pakison on 21/5/18
 */
 const xlsx = require('node-xlsx');
 const fs = require('fs');
 module.exports = {
   saveXlsx(data_arr, target, cb){
     var buffer = xlsx.build(data_arr);
     fs.writeFile(target, buffer, function(err) {
       if (err) {
         throw err;
       }
       if(fs.existsSync(target)){
         cb({success:true,path:target})
       }else{
         cb({success:false})
       }
     })
   },
   saveXlsxCo(data_arr, target){
     return new Promise((resolve,reject)=>{
       var buffer = xlsx.build(data_arr);
       fs.writeFile(target, buffer, function(err) {
         if (err) {
           reject(err);
         }
         if(fs.existsSync(target)){
           resolve({success:true,path:target})
         }else{
           resolve({success:false})
         }
       })
     })
   },
   parseXlsx(filepath){
     return xlsx.parse(filepath);
   },
 }