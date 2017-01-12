// index.js
// style.sass를 추가함
require('./style.sass');
var webpack = require('./webpack');
var hello = require('./hello');
document.write(hello + ', ' + webpack + '!');