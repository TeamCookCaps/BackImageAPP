# BackImageAPP 레포

폴더 구조
``` 
src
|   app.js  #express 라우터 의 endpoint 기술
|___ api
     |- middlewares
     |- routes
|___ config     # 환경변수 밑 설정파일
|___ loaders    # 시작프로세스 모듈별로 분할
|___ models     # database models
|___ services   # 비즈니스 로직
``` 

1. 서버 사용 시 아래의 명령어 작성
``` 
yarn run dev
``` 

2. api 호출 테스트 시 http://localhost:3000/{suburl} 입력 하면 해당 API 확인 가능