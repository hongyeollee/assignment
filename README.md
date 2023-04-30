# assignment

- 과제를 수행하면 신입으로서 부족함을 많이 느꼈습니다. 신입 개발자로서 처음수행하는 과제로 배워야할 것들도 물론 많겠지만 과제를 통해서 성장하고 앞으로 업무에 있어서도 성장하는 사람이 되어 회사의 발전에 기여할 수 있는 구성원이 되고 싶습니다. 과제에서도 주민번호의 암호화/복호화, multipart/formdata를 활용하여 image에 대한 정보를 저장하는 기능, 로그인시에 jwt의 refresh token 발행 등에 대한 기능을 구현하지 못한 부분들이 많습니다.
  많은 부분들이 충족되지 못하였으나 이번 기회를 통해서 많은 것들을 배워나가야 하는 부분들에 대해서 `함께 성장할 수 있는 기회를 주시면 감사하겠습니다.`
  과제를 시도해볼 수 있는 기회를 주심에 감사합니다.🙇🏻‍♂️

여유가 많지 않으신 부분들에 대해서 충분히 인지하고 있으나 혹시나 조언을 주실 수 있다면 조언 부탁드리겠습니다.
주시는 조언에 대해서 잘 참고해서 잘 성장할 수 있는 개발자가 되도록 노력하겠습니다.

다시 한 번 감사합니다.

# 프로젝트 실행 방법과 디렉토리 구조 설명

> ### 디렉토리 구조(tree)

```
├── ./app.js
├── ./controllers
│   ├── ./controllers/patientController.js
│   └── ./controllers/userController.js
├── ./db
│   └── ./db/hospital.sql
├── ./middleware
│   ├── ./middleware/error.js
│   └── ./middleware/imageUploader.js
├── ./models
│   ├── ./models/index.js
│   └── ./models/patientDao.js
├── ./package-lock.json
├── ./package.json
├── ./readme.md
├── ./routes
│   ├── ./routes/index.js
│   ├── ./routes/patientRouter.js
│   └── ./routes/userRouter.js
├── ./server.js
└── ./services
    ├── ./services/patientService.js
    └── ./services/userService.js
```

> > ## layered architecture

- 디렉토리 구조는 코드의 가독성/유지보수성을 고려하여 레이어드아키텍쳐를 구성하여 코드를 작성했습니다.

> ### 각 구조별 프로젝트 실행방법

1.  app.js : 전체적인 서버를 작동시키기 위한 기본적인 제반사항(express, morgan, cors, globalErrorHandler)를 작동할 수 있도록 했습니다.
2.  server.js : app.js에서의 기능들이 server.js로 이어져 서버를 운영하고자 할때 작동시킬 수 있도록 nodemon을 통하여 작동할 수 있도록 했습니다.

- app.js와 server.js를 구분하여 구조를 구성한 이유는 이번 과제 제출에서는 `테스트코드`를 작성하는데 있어서 구현하지는 못했지만 차후 테스크코드를 작성하는데 가능할 수 있도록 구조를 설계하고자 나누게 되었습니다.

3. routes
   3-1. index.js : 각 기능별(로그인, 환자CRUD)에 대한 `대분기` 라우팅을 위한 기능을 할 수 있도록 했습니다.
   3-2. patientRouter.js : 환자에 대한 CRUD를 할 수 있도록 `endpoint`라우터 역할을 할 수 있는 기능을 하였습니다. 이때 환자에 대한 정보를 생성(post), 수정(patch)하는데 있어 환자의 이미지정보를 저장하는 내용을 middleware로 생성하여 작동할 수 있도록 구조를 만들었습니다.
   3-3. userRouter.js: 환자정보를 CRUD할 수 있는 권한을 가질 수 있도록 하기 위한 로그인/로그아웃에 대해 기능을 할 수 있는 `endpoint`를 생성하여 작동할 수 있도록 했습니다.
4. controllers
   4-1. patientController.js : 클라이언트(frontend)에서 브라우저에서 유저가 환자에 대한 정보(이름,주민번호,생년원일,주소 등)에 대해 get(조회),post(생성),patch(수정),delete(삭제) 할 수 있도록 하는 입력하는 역할을 하여 입력에 대한 response를 할 수 있는 내용에 대해 기능하도록 했습니다.
   4-2. userController.js : 클라이언트(frontend)에서 브라우저에 유저의 정보를 CRUD할 수 있는 권한을 접근하기 위한 id,pw를 입력하고 그에 대한 response를 기능할 수 있도록 했습니다.
5. services
   5-1. patiensService.js : patientController.js에서 입력한 정보들을 기반으로 서비스 운영에 대한 추가적인 기능이 작동될 수 있는 세부적인 로직을 포함할 수 있도록 합니다. 환자 생성(post)시에는 주민번호가 암호화되어 `essn` 이라는 `parameter`로되어 DB에 저장할 수 있는 로직이 작성되어야 합니다. 이외에 조회(get),수정(patch),삭제(delete)에 대해서도 작성되어 서비스적 로직을 작성합니다.
   5-2. userService.js : userController.js에서 입력한 정보들로 login과 logout에 대한 서비스적 로직을 생성합니다. login시에는 jwt를 통하여 user가 로그인 시 token을 발급하여 권한을 받을 수 있도록 합니다.
6. Models
   6-1.index.js : 각 기능별 DB에 접근 할 수 있도록 연결을 위하여 `typeorm`을 사용하였습니다. DB에 대한 정보들(type, host, port 등)에 대해서 입력하였습니다.
   6-2. patientDao.js : 환자에 대한 정보를 CRUD할 수 있도록 하기 위해 각 기능별로 mysql query를 사용하였고 환자에 대한 정보를 생성,수정하는데에는 mysql의 DB의 schema가 나뉘어져 있어 트랜잭션을 사용하도록 했습니다.
7. middleware
   7-1.error.js : user가 각 기능별로 기능을 작동하는데에 있어 에러가 발생할 수 있는 예외규칙 외의 에러를 발생하는 경우를 대비하여 middleware로 catch할 수 있능 기능을 포함하였습니다. 전체적인 에러를 핸들링할 수 있도록 globalErrorHandler를 작성하여 이를 app.js에 포함시켜 놓았습니다.
   7-2.imageuploader.js : 환자의 생성(POST)과 수정(patch)시에 image에 대한 정보들이 저장될 수 있도록 Middleware로 만들어 multer/formdata를 활용하도록 합니다.
