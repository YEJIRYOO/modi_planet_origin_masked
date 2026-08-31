# 모디플래닛 어드민
<br>
LMS_CLIENT는 여러 모노레포 툴 중에 rush를 사용중

- rush.json 파일 안에 rush로 관리할 프로젝트가 명시 되어 있음
- 의존성 패키지는 rush update 명령어로 설치하며 common/temp/node_modules 경로에 설치됨 
- rush는 프로젝트마다 있는 node_modules 들을  common/temp/node_modules 에 심링크로 연결함
---

### 1. rush 설치   
```

npm install -g @microsoft/rush

```

---

### 2. git submodule init , git submodule update
rush update로 의존성패키지를 설치하기 전 서브모듈을 설치
```

git submodule init && git submodule update

```

---

### 3. rush update
의존성 패키지 설치 

```

rush update

```
---

### 4. rushx start
실행할 경로로 이동 후 rushx start
```
// LMS_CLIENT/service/admin-gui 

rushx start

```

<br>

### 관련 링크<br>

[rush 홈페이지](https://rushjs.io/pages/intro/get_started/)
<br>
[관련 Blog 참조](https://medium.com/mildang/rush%EB%A1%9C-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%AA%A8%EB%85%B8%EB%A0%88%ED%8F%AC-%EB%8F%84%EC%9E%85%EA%B8%B0-5da0c5bc9b30)
