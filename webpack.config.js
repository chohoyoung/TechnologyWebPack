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
