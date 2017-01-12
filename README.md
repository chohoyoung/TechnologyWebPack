# TechnologyWebPack
WebPack에 관해서 정리하고 공부하려고 하는 Git Repository

# 1.WebPack이란?
공식사이트에 보면 webpack은 모듈 번들러로써 의존성을 가진 모듈을 다루고, 그 모듈로 부터 정적인 asset을 생성한다고 적혀있다.


간단히 말하자면 연관성있는 모듈들을 하나의 bundle로 압축하고 관리 해줄수 있게 해주는 도구이다.

# 2. 간략 테스트
## 2.1 폴더 생성
테스트를 위한 폴더를 생성한다.

    mkdir webpack-test && cd webpack-test

## 2.2 webpack 설치
webpack을 사용하려면 webpack설치가 필요하다. npm을 통해서 설치가 쉽게 가능하다.

    npm install webpack
    
## 2.3 폴더 안에다가 간단한 index.html을 하나 생성한다.

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>WebPack Test</title>
        <script type="text/javascript" src="bundle.js></script>
    </head>
    <body>
        Welcome To Webpack World.
    </body>
    </html>
    
## 2.4 사용할 모듈을 구현한다.
hello.js
    
    module.export = 'Hello';
    
webpack.js

    module.export = 'Webpack';
    
## 2.5 hello, webpack모듈을 사용할 컨트롤러를 만든다.
index.js

    var hello = require('./hello');
    var webpack = require('./webpack');
    document.write(hello + ', ' + webpack + '!');

## 2.6 마지막으로 webpack을 통해서 해당 모듈과 컨트롤러를 build한다.
    
    webpack index.js bundle.js
    
## 2.7 (2.3)에서 생성한 html을 실행하면 입력햇던 값이 화면에 표시된다.
    
## 2.8 요약
요약하면 두개의 모듈(hello.js와 webpack.js)을 webpack을 통해서 bundle.js로 내보내는 작업이며 압축이나 config파일을 통한 설정 및 여러 플러그인들을 사용해서 하는 작업은 계속 이어서 설명하겠다. 

# 3. Style
웹팩은 Style Sheet도 포함해서 빌드 할 수 있다. 하지만 사용하려면 [style-loader](https://github.com/webpack/style-loader), [css-loader](https://github.com/webpack/css-loader)같은 별도의 loader플러그인을 설치 해야한다.

## 3.1 필요한 loader 설치
npm install --save style-loader css-loader

## 3.2 간단한 CSS 작성

    /* style.css */
    body {
        font-size: 20px;
        color: greenyellow;
    }

## 3.3 작성한 css를 index.js에 추가.

    // index.js
    require('!style!css!./style.css');  // style.css를 추가함.
    var webpack = require('./webpack');
    var hello = require('./hello');
    document.write(hello + ', ' + webpack + '!');
    
require()안에 들어간 문자열이 복잡한데 이것의 뜻은 아까 추가했던 style과 css로더를 설정하고 그것을 통해 style.css를 추가시 로더를 사용하겠다는 뜻이다.

참고로 javascript같은경우는 확장자(.js)를 생략이 가능하지만 나머지것들은 확장자를 생략하면 찾지를 못하게 된다.

## 3.4 테스트
아래의 명령어를 입력하고 bundle.js를 생성하고 그것을 사용했던 index.html을 실행해보면 글씨 색갈이 바뀐것을 볼 수 있다.    
    
    webpack index.js bundle.js
    
즉 웹팩은 css도 묶어 준다라고 알 수 있다.

## 3.5 sass-loader
css loader를 써보았으니 [sass-loader](https://github.com/jtangelder/sass-loader)를 사용해보자.
 
## 3.6 sass-loader 설치

    npm install --save node-sass sass-loader
    
## 3.7 css를 sass로 변환한다.

    // index.js
    // style.sass를 추가함
    require('!style!css!sass!./style.sass');
    var webpack = require('./webpack');
    var hello = require('./hello');
    document.write(hello + ', ' + webpack + '!');
    
## 3.8 빌드 및 테스트
아래 명령어 입력후 이상없이 bundle.js가 생성이 되었으면 index.html을 실행해서 이상없는지 테스트를 해보자.

    webpack index.js bundle.js
    
# 4. Config
매번 새로운 js나 스타일시트들이 추가 될때마다 require()함수를 계속 추가,추가,추가 하면서 사용하기는 솔직히 불편하다. 그래서 webpack.config.js라는 설정 파일을 사용해서 편하게 관리 할 수 있다.
 
    console.log(__dirname); // __dirname은 현재 실행된 디렉토리의 경로를 뜻하는 공유변수라 할 수 있다.
    
    var config = {
        entry: './webpack-test/index.js',  // 빌드되기전의 파일 경로
        output: {   // bundle로 만들어질 파일이 위치되는 경로와 파일명
            path: __dirname,
            filename: '/webpack-test/bundle.js'
        },
        module: {
            loaders: [
                { test: /\.sass$/, loader: 'style!css!sass' }
            ]
        }
    };
    
    module.exports = config;
    
간단히 봐도 참 알기 쉬운 설정 파일이다. entry는 빌드 대상 경로, build된 파일의 output은 출력 대상 경로를 설정한다.
    
별도 추가된 로더를 사용하고 싶으면 module의 loaders속성에 사용할 로더의 정보를 설정하면된다. test속성에는 파일을 찾을 정규식을 넣고 loader엔 찾은 파일이 사용할 로더를 설정한다.
 
이렇게 설정파일을 만들어 주게 되면 require()를 쓸때 사용할 loader를 뜻하는 설저을 따로 할 필요가 없다.

    // index.js
    require('./style.sass'); // 기존의 !stlye!css!sass!를 더이상 할 필요 없다. 
    var webpack = require('./webpack');
    var hello = require('./hello');
    document.write(hello + ', ' + webpack + '!');

## 4.1 실행
아래 명령어를 통해서 바로 실행이 이제 가능해진다. 

    webpack
    
# 5. Babel
    
   
    