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
웹팩은 Style도