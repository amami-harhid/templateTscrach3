const href = location.href;
const simpleDirName = href.replace(/\/$/,'').replace(/^.+\//, '');
const bundleDir = `../../build/${simpleDirName}/bundle.js`;
const scriptTag = document.createElement("script");
scriptTag.setAttribute('src', bundleDir);
scriptTag.setAttribute('type','module');
document.head.appendChild(scriptTag);
