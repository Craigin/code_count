'use strict';
const xlsx = require('./libs/xlsx');
const path = require('path');
const util = require('./libs/util');
const fs = require('fs');
const config = {
  git_user:"sunpeijie",
  workspace:"/Users/pakison/WebstormProjects/",
  data_path:path.join(__dirname,'data.xlsx')
}
const exec = require('child_process').exec;
(async function(){
  let data = util.formatDate(new Date())+'   ';
  const files = fs.readdirSync(config.workspace);
  if(files.length){
    for(let i=0;i<files.length;i++){
      try {
        const statInfo = fs.statSync(config.workspace+files[i]);
        if(statInfo.isDirectory()){
          const line = await getCodeLine(files[i]);
          if(line) data += files[i] + ':' + line+'   ';
        }
      }catch (e) {
        console.log('====stat error:',e.message)
      }

    }
    fs.writeFileSync('count.txt',data,{flag: 'a'});
  }
  async function getCodeLine(project){
    return new Promise((resolve, reject)=>{
      const order = `cd ${config.workspace+project};git log --author="${config.git_user}" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%s", loc }'`;
      exec(order,
        (error, stdout, stderr) => {
          console.log(error);
          resolve(stdout)
        });
    })
  }
}())
