# wetube

Cloning Youtube with Vanilla and NodeJS

# curriculum

1. Your First Express Server

   - npm 초기화
   - express 모듈 설치
   - git repository 연결

2. Handling Routes with Express

   - 웹에는 get, post 두가지 요청 방식
     : get = 단순히 정보를 보여줌
     : post = 정보를 전달해줌
   - 요청시 request, response 두가지의 파라메터가 있다
     : request = 웹에서의 전달하는 정보가 들어있다
     : response = 웹에서의 요청을 대답한다

3. ES6 on NodeJS using Babel

   - Babel
     : 최신 문법의 Javascript 코드를 구 문법의 코드로 변환시켜주는것
     : 아마도 최신 문법의 코드를 이해하지 못하는 브라우저가 있기에 추가 해주는듯

     1. @babel/preset-env 설치
        - npm install @babel/preset-env
        - 에러발생 => permission 문제 발생 => 관리자 권한 terminal 로 설치 시 성공
     2. es6 코드로 변환
     3. package.json script 수정 (node => babel-node)
        - 에러발생 => @babel/node 설치 => 에러 발생 => @babel/core 설치
        - @babel/core 는 일반 terminal 로도 설치가 가능
     4. .babelrc 파일 생성

   - nodemon
     : 코드의 변경을 감지하여 서버를 재 시작해준다
     : 현재 프로젝트에 필요한 package 라면 npm 옵션을 입력하지 않아도 된다 => npm install [package]
     : 현재 프로젝트가 아닌 범용적으로 필요한 package 라면 -D 옵션을 추가한다 => npm install [package] -D

     1. nodemon 설치
     2. package.json script 수정 nodemon 추가 (babel-node => nodemon --exec babel-node)
