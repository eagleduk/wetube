# wetube

Cloning Youtube with Vanilla and NodeJS

# Pages:

- [ ] Home
- [x] Join
- [x] Login
- [x] Search
- [ ] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload
- [ ] Video Detail
- [x] Edit Video

# curriculum

1. Your First Express Server

   - npm 초기화
   - express 모듈 설치
   - git repository 연결
   - .gitignore 작성 => github 에서 제공하는 nodejs 의 기본 포멧 사용

1. Handling Routes with Express

   - 웹에는 get, post 두가지 요청 방식
     - get = 단순히 정보를 보여줌
     - post = 정보를 전달해줌
   - 요청시 request, response 두가지의 파라메터가 있다.
     - request = 웹에서의 전달하는 정보가 들어있다.
     - response = 웹에서의 요청을 대답한다.

1. ES6 on NodeJS using Babel

   - Babel

     - 최신 문법의 Javascript 코드를 구 문법의 코드로 변환시켜주는것
     - 아마도 최신 문법의 코드를 이해하지 못하는 브라우저가 있기에 추가 해주는듯

     1. @babel/preset-env 설치
        - npm install @babel/preset-env
        - 에러발생 => permission 문제 발생 => 관리자 권한 terminal 로 설치 시 성공
     1. es6 코드로 변환
     1. package.json script 수정 (node => babel-node)
        - 에러발생 => @babel/node 설치 => 에러 발생 => @babel/core 설치
        - @babel/core 는 일반 terminal 로도 설치가 가능
     1. .babelrc 파일 생성

   - nodemon

     - 코드의 변경을 감지하여 서버를 재 시작해준다
     - 현재 프로젝트에 필요한 package 라면 npm 옵션을 입력하지 않아도 된다. => npm install [package]
     - 현재 프로젝트가 아닌 범용적으로 필요한 package 라면 -D 옵션을 추가한다. => npm install [package] -D

     1. nodemon 설치
     1. package.json script 수정 nodemon 추가 (babel-node => nodemon --exec babel-node)

1. Express Core: Middlewares

   - 웹의 요청이 발생할 때 응답을 하기전에 지정한 로직을 수행할 수 있게 해주는것
   - IP 검사, Logging, 권한 체크 등을 수행하여 block 을 하던가 다른 곳으로 보내버리는 것이 가능
   - 전역적인 미들웨어가 있고, 원하는 요청시에만 부여해주는 미들웨어가 있다.
     1. 전역적인 미들웨어는 라우터 보다 먼저 위치해야 모든 요청에서 사용 가능하다.
     1. 라우터의 응답 앞에 위치하면, 해당 요청에만 사용 가능하다.
   - 미들웨어는 정해진 수가 없다.
   - 미들웨어에서 next() 를 하지 않으면 다음 미들웨어나 응답으로 넘어가지 않는다.

   1. morgan

      - url 요청에 대한 logger 를 위한 package
      - logger 를 남기기 위한 옵션이 존재 (common, tiny, dev, short ... 등)

   1. helmet

      - express 보안을 위한 package

   1. cookie-parser

      - cookie 를 저장하기 위한 package

   1. body-parser

      - form data 를 받기위한 package
      - data 를 받기 위한 format 을 설정할 수있다.(json, text, raw, urlencoded)

   1. 정적파일
      - express 에서 사용하는 정적 파일의 경로를 설정한다.
      - 해당 URL 로 요청이 오면, 설정한 폴더로 연결한다.

1. Express Core: Routing

   - 제공하는 웹의 router 주소 매핑이 파일 하나에 모두 적혀있으면 구별하기가 어렵다.
   - 따라서 es6 의 import / export 를 사용하여 router, application, server 모듈을 나누어 관리한다.
   - url 의 대메뉴 별로 파일을 관리하는게 효과적.
   - 라우터에서 /:[변수명] 형식으로 되어 있는 주소는 주소값이 정해져 있지 않은걸 의미한다. 모든값이 주소로 입력 될 수가 있다. 하지만 controller 에서 [변수명] 으로 된 파라메터를 받을 수 있다. express 에서는 중요한 패턴.

1. MVC Pattern

   - M(model) => Data, Database
   - V(view) => html,css
   - C(controller) => router, controller

1. Template (M`V`C)

   - express 에서 템플릿 언어를 사용하려면 application 에서 view engine 을 설정 해주어야 한다.
   - express 에서 템플릿의 기본 위치를 지정할 수 있다. 기본값은 (/views)

   1. pug

      - 템플릿 언어
      - Html 을 조금 세련되게 사용할 수 있게 해준다.
      - \<span>Hello\</span> ==> span Hello
      - pug 에서 child element 는 들여쓰기로 구분한다. 같은 라인에 있으면 형제관계 (마치 파이썬처럼)
      - extends 명령어로 다른 pug 파일을 참조 할 수 있다.
      - block [변수명] 으로 다른 pug 파일에서 [변수명] 을 선언할 수 있다.
      - #{ [Javascript] } 방식으로 Javascript 를 수행 할 수있다.
      - include 명령어로 다른 pug 파일을 가져올 수 있다. 보통 컨텐츠가 변경되지 않는 영역에 사용되는 듯하다.
      - pug 에서 HTML 을 작성할 때에는 emmet 문법의 태그 간소화 방법 등과 비슷하다.
        - [태그].[class명]
        - attribute 값은 () 로 처리한다. [태그]\(href="#") 태그와 () 사이의 공백도 인식을 하는 것으로 파악. 따라서 띄어쓰기를 하면 정상 작동을 하지 않는다.
      - 태그가 아닌 텍스트로 라인을 시작해야 할때, |(파이프) 를 사용하면 된다.
      - 반복문을 사용할 때, each [iterator] in [변수] 형식으로 사용한다.
      - Mixins
        - 반복되는 영역을 사용할때
        - Javascript 의 함수와 비슷
        - mixin [함수명]\(파라메터)
        - 사용할 때에는 +[함수명]\(파라메터) 로 사용
      - 조건문(if) 를 사용할 때, 조건식에 () 생략. if [조건] else
      - Javascript 가 아닌 일반적으로 변수를 사용할때, [태그]= [변수명] 으로도 사용이 가능하다.

   1. 변수
      1. 전역 변수
         - res.locals.[변수명] 식으로 모든 라우터에서 사용할 수 있는 변수를 지정할 수 있다.
         - pug 에서 변수를 사용하기 위해서는 content 부분에서는 #{} 문법을, 태그의 속성 부분에서는 별다른 문법은 없는듯 하다. => [태그]\(속성명=[변수명]) #{[변수명]}
      1. render 변수
         - router 에서 결과를 render 할때, object 형태로 변수를 전달할 수 있다.
         - 변수가 텍스트에만 활용될 경우, [태그]=[변수명] 으로도 사용이 가능하다.

1. Controller (MV`C`)

   - form get 방식으로 값을 전달하면, request.query 에 object 형태로 전달이 된다.
   - post / get 방식에 따라 router 를 구분지어야 한다.
   - body-parser 가 없으면, form 의 정보를 얻을수 가 없다.
   - http 의 response status code 로 브라우저에 상태를 전달 할 수있다. (상태 코드에 따라 브라우저가 자동 저장할지 여부를 보여준다.)

1. MongoDB (`M`VC)

   - NO SQL Database
   - nodeJS 에서 사용하려면 mongoose 설치 필요
   - .msi 파일로 설치, 환경변수 설정

   1. schema
      - 해당 DB 의 칼럼을 정의 하는 것
      - firebase 의 필드와 비슷한 의미인듯
      - 타 모델의 id 를 참조할 수 있다.
   1. model
      - 정의한 schema 형태의 DB
      - 이름과 schema 값으로 model 을 만든다.
      - firebase 의 컬렉션이랑 비슷한 의미인듯

1. dotenv

   - 소스코드 공유시, 공유하기에 위험한 항목(URL, PORT, Application Key 등을 관리)
   - dotenv import 이 후, dotenv.config() 로 .env 파일을 읽고 process.env.[변수명] 으로 호출가능하다.

1. async ~ await

   - 시간이 걸리는 함수에 대하여, 종료가 될때까지 기다리는 의미.
   - await 함수의 종료만 기다리는 것이므로, 에러가 발생하면 해당 함수 전체가 에러발생.
   - try ~ catch 생활화 필요

1. multer

   - file 을 upload 할때 사용된다.
   - 미들웨어에서 파일을 체크하고 저장하고 정보를 반환한다.
   - 저장 경로와 저장할 필드 이름을 지정한다.
   - 저장 후 라우터의 callback 에서 request 로 정보를 받을 수 있다.

1. eslint

   - 지금 당장 설치 이유가 없기에 현 시점에서는 패스

1. webpack

   - webpack, webpack-cli 설치
   - webpack config
     1. entry
     1. mode
     1. module
        - module 의 rules loader 항목은 마지막 선언부터 처음 선언 순으로 rule 이 실행된다.
          1. Extract-text-webpack-plugin
             - webpack4 버전 이상에서는 mini-css-extract-plugin 으로 변경
          1. css-loader
             - 권한 문제로 인한 관리자 권한으로 설치
          1. postcss-loader
             - autoprefixer 옵션이 문법이 변경.
          1. sass-loader
          1. babel-loader
             - webpack 실행시 es6 를 예전 자바스크립트 문법으로 변경
          1. @babel-polyfill
             - webpack5 로 넘어오면서 문제 발생
             - es6 의 async / await 문법을 변경해주는거 같은데.. config 에 추가하면 에러가 발생한다..
             - async / await 가 있는 js 에 import "@babel/polyfill"; 를 추가하였다.. 아직 맞는 방법인지는 모르겠다.
             - 또는 config 에 resolve 항목을 추가 하여 해결.. 아직 맞는 방법인지는 모르겠다. 현재 적용되어 있는 방법
     1. output
     1. plugin

1. 사용자 인증, 저장 (cookie)
   - 사용자에 관련한 정보를 저장
   1. passport
      - 사용자 인증 관련 로직을 수행해준다.
      - session 에 있는 데이터를 cookie 에 저장한다.
      1. serializeUser
         - cookie 에 담을 정보를 결정한다.
      1. deserializeUser
         - cookie 에 담을 정보로 해당하는 데이터를 추출하는 로직을 결정한다.
      1. authenticate
         - 인증 방식을 결정하고, 인증 성공 / 실패시 redirect 를 해준다.
   1. passport-local
      - id/password 로 사용자 인증을 처리해주는 package
   1. passport-local-mongoose
      - id/password 로 passport 사용자 인증과 mongoose 를 연결해주는 mongoose plugin
      - passport 에서 설정해야 하는 부분들을 간단하게 수행해주는 method 를 제공한다.
      1. createStrategy
         - 사용자 인증에 대한 로직을 수행 해준다.
      1. serializeUser
         - cookie 에 담을 사용자 정보를 결정해준다.
      1. deserializeUser
         - cookie 에 담긴 정보로 해당하는 데이터를 추출해준다.
      1. register
         - 데이터 모델 객체에 패스워드를 부여하면서 데이터를 생성한다.
   1. express-session
      - 데이터 인증 정보를 session 에 저장한다.
   1. connect-mongo
      - 저장되는 session 정보를 DB 에 저장시키고, 비교한다?
      - 서버가 재시작 되도 기존의 session 을 사용할 수 있도록 한다.
   1. passport-github
      - github - Settings - Developer settings - OAuth Apps 추가
      - 접속하는 HomepageURL, CallbackURL 작성
      - github 인증 성공 후, 보내주는 profile 로 User 생성 또는 기존 User 업데이트
      1. github website(auth) => passport.authenticate("github")
      1. github website(auth) callback => GitHubStrategy - callbackURL
      1. callback => githubLoginCallback(_,_,profile,cb)
      1. find(Create) Or Error
         1. find(User Update(githubId, avatar)) / create(User Create) => return cb(null, user) => makeCookie => saveCookie => sendCookie
         1. Error => return cb(error) => passport failureRedirect
