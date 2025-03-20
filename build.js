const fs = require('fs');
const {glob} = require('glob');
const { execSync } = require('child_process');

const entries = glob.sync('./src/**/index.ts');
const absolutePath = fs.realpathSync('./');
const npxWebpack = "npx webpack --mode development"
const dirArr = [];
try{
    for(const _entry of entries){
        const directory = _entry.replace('src\\','').replace(/\\.*.ts$/,'');
        dirArr.push(directory);
    }
    dirArr.sort();
    for(const _dir of dirArr){
        console.log(_dir)
        const workingDir = absolutePath+'/src/'+_dir;
        process.chdir(workingDir);
        execSync(npxWebpack);
    }
    
}catch(e){
    throw e;
}
