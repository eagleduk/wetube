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

1. Express Core: Routing

   - 제공하는 웹의 router 주소 매핑이 파일 하나에 모두 적혀있으면 구별하기가 어렵다.
   - 따라서 es6 의 import / export 를 사용하여 router, application, server 모듈을 나누어 관리한다.
   - url 의 대메뉴 별로 파일을 관리하는게 효과적.

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

   1. 변수
      1. 전역 변수
         - res.locals.[변수명] 식으로 모든 라우터에서 사용할 수 있는 변수를 지정할 수 있다.
         - pug 에서 변수를 사용하기 위해서는 content 부분에서는 #{} 문법을, 태그의 속성 부분에서는 별다른 문법은 없는듯 하다. => [태그]\(속성명=[변수명]) #{[변수명]}
      1. render 변수
         - router 에서 결과를 render 할때, object 형태로 변수를 전달할 수 있다.
         - 변수가 텍스트에만 활용될 경우, [태그]=[변수명] 으로도 사용이 가능하다.

1. Controller (MV`C`)
   - form get 방식으로 값을 전달하면, request.query 에 object 형태로 전달이 된다.
