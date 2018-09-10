'use strict';
const xlsx = require('./libs/xlsx');
const path = require('path');
const requireDir = require('require-dir');
const config = {
  git_user:"sunpeijie",
  workspace:"/Users/pakison/WebstormProjects/",
  data_path:path.join(__dirname,'data.xlsx')
}
const files = requireDir(config.workspace);

const exec = require('child_process').exec;
(async function(){

  async function getCodeLine(project){
    return new Promise((resolve, reject)=>{
      exec(`cd ${config.workspace+project};git log --author="${config.git_user}" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%s", loc }'`,
        (error, stdout, stderr) => {
          resolve(stdout)
        });
    })
  }
}())
