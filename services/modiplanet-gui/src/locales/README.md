# `services/modiplanet-gui/src/locales` 디렉토리 README

---

### 1. 제목 및 목적  
이 디렉토리는 **MODI Planet GUI 애플리케이션의 다국어 지원을 위한 번역 파일**을 담고 있습니다.  
각 언어별 `translation.json` 파일은 사용자 인터페이스 텍스트(로그인, 프로필 관리, 문의 등)를 해당 언어로 제공하여 글로벌 사용자에게 접근성을 높입니다.

---

### 2. 주요 컴포넌트  

| 파일 경로 | 목적 | 설명 |
|----------|------|------|
| `en-US/translation.json` | 영어 번역 파일 | 미국 영어를 기준으로 한 UI 텍스트 번역 |
| `es/translation.json` | 스페인어 번역 파일 | 스페인어 사용자 대상 UI 텍스트 |
| `ko-KR/translation.json` | 한국어 번역 파일 | 한국 사용자 대상 UI 텍스트 (법적 정보 포함) |
| `pl/translation.json` | 폴란드어 번역 파일 | 폴란드어 사용자 대상 UI 텍스트 |

---

### 3. 데이터 흐름 / 프로세스  
- **번역 파일 사용 흐름**:  
  ```mermaid
  sequenceDiagram
    participant UI as UI Component
    participant Locale as Locale Module
    participant User as User

    User->>Locale: 언어 설정 요청 (예: ko-KR)
    Locale->>UI: 요청된 언어의 `translation.json` 파일 로드
    UI->>Locale: 특정 키(예: "SIGNIN_SIGNUP")에 대한 번역 텍스트 요청
    Locale-->>UI: 번역된 텍스트 반환
    UI->>User: 사용자에게 해당 언어의 UI 표시
  ```

---

### 4. 의존성  
- **내부 의존성**:  
  - `services/modiplanet-gui/src/` 내의 UI 컴포넌트(예: 로그인, 프로필 관리)  
- **외부 의존성**: 없음  

---

### 5. 실행 / 테스트 방법  
- **번역 파일 테스트**:  
  - 각 `translation.json` 파일의 유효성 검증을 위해 JSON 포맷 검증 도구 사용 (예: `jsonlint`)  
  - 번역 키 일관성 확인: 모든 언어 파일에서 동일한 키가 존재하는지 확인  

---

### 참고  
- 번역 키는 `translation.json` 파일 내에서 일관된 이름 규칙을 따릅니다 (예: `SIGNIN_SIGNUP`, `WITHDRAW_REASON1`).  
- 한국어 파일(`ko-KR/translation.json`)은 법적 정보(예: 정보통신망 이용촉진 및 정보보호 등에 관한 법률)를 포함하여 법적 준수를 보장합니다.