# 코딩 컨벤션

> 이 문서는 LMS-Client 프로젝트의 코딩 규칙 및 베스트 프랙티스를 정의합니다.

## 목차

1. [기본 원칙](#기본-원칙)
2. [TypeScript](#typescript)
3. [React 컴포넌트](#react-컴포넌트)
4. [파일 & 폴더 구조](#파일--폴더-구조)
5. [네이밍 컨벤션](#네이밍-컨벤션)
6. [스타일링 (Tailwind CSS)](#스타일링-tailwind-css)
7. [상태 관리](#상태-관리)
8. [API & GraphQL](#api--graphql)
9. [다국어 (i18n)](#다국어-i18n)
10. [Import 순서](#import-순서)
11. [코드 품질 원칙](#코드-품질-원칙)

---

## 기본 원칙

### 1. 재사용성 우선

- 컴포넌트는 단일 책임 원칙(Single Responsibility Principle)을 따름
- 비즈니스 로직과 UI를 분리
- 공통 기능은 훅(hooks)으로 추출

### 2. 타입 안전성

- `any` 타입 지양, 타입 추론 활용
- strict mode 사용

### 3. 일관성

- 프로젝트 전체에서 동일한 패턴 유지
- 네이밍, 구조, 스타일 규칙 준수

---

## TypeScript

### 기본 규칙

```typescript
// ✅ Good: 명시적 타입 정의
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

// ✅ Good: type alias 사용 (프로젝트 일관성)
type CourseStatus = 'ongoing' | 'complete' | 'not_started';

// ❌ Bad: any 사용
const fetchData = (id: any) => { ... }

// ✅ Good: 제네릭 활용
const fetchData = <T>(id: string): Promise<T> => { ... }
```

### 타입 정의 위치

1. **공통 타입**: `src/types/` 디렉토리
2. **컴포넌트 타입**: 컴포넌트 파일 상단
3. **API 타입**: `services/api/*/types.ts`

```typescript
// types/course.ts
export type Course = {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
};

// components/CourseCard/CourseCard.tsx
interface CourseCardProps {
  course: Course;
  onContinue: (id: string) => void;
}
```

### Interface vs Type

- **type 사용 권장** (프로젝트 일관성)
- Union, Intersection 필요 시 type 필수
- 확장이 필요한 경우에만 interface 고려

---

## React 컴포넌트

### 기본 구조

```typescript
// ✅ Good: Functional Component + TypeScript
import { useState } from 'react';
import type { Course } from '@/types';

type CourseCardProps = {
  course: Course;
  onComplete: (id: string) => void;
};

export default function CourseCard({ course, onComplete }: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 bg-white rounded-lg">
      <h3>{course.title}</h3>
      {/* ... */}
    </div>
  );
}

// ❌ Bad: Class Component
class CourseCard extends React.Component { ... }

// ❌ Bad: React.FC (타입 추론 이슈)
export const CourseCard: React.FC<CourseCardProps> = ({ ... }) => { ... }
```

### Container/Presenter 패턴

#### Container (로직)

```typescript
// pages/study-room/MyCourse/index.tsx
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_COURSES } from '@/services/api/course';
import InProgressCourseList from './components/InProgressCourseList';

export default function MyCourseContainer() {
  const { data, loading, error } = useQuery(GET_MY_COURSES);
  const [filterStatus, setFilterStatus] = useState<CourseStatus>('all');

  const filteredCourses = useMemo(
    () =>
      data?.courses.filter(
        (c) => filterStatus === 'all' || c.status === filterStatus,
      ),
    [data, filterStatus],
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <InProgressCourseList
      courses={filteredCourses}
      onStatusChange={setFilterStatus}
    />
  );
}
```

#### Presenter (UI)

```typescript
// components/InProgressCourseList/index.tsx
type Props = {
  courses: Course[];
  onStatusChange: (status: CourseStatus) => void;
};

export default function InProgressCourseList({
  courses,
  onStatusChange,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

### Custom Hook 패턴

```typescript
// hooks/useCourseList.ts
export function useCourseList(userId: string) {
  const { data, loading, error } = useQuery(GET_USER_COURSES, {
    variables: { userId },
  });

  const [updateProgress] = useMutation(UPDATE_COURSE_PROGRESS);

  const inProgressCourses = useMemo(
    () => data?.courses.filter((c) => c.status === 'ongoing'),
    [data],
  );

  const markComplete = useCallback(
    (courseId: string) => {
      return updateProgress({
        variables: { courseId, status: 'complete' },
      });
    },
    [updateProgress],
  );

  return {
    inProgressCourses,
    loading,
    error,
    markComplete,
  };
}
```

---

## 파일 & 폴더 구조

### 전체 구조

```
src/
├── components/           # 공통 컴포넌트
│   ├── hooks/           # 공통 커스텀 훅
│   ├── provider/        # Context Provider
│   ├── ui/              # UI 컴포넌트 (NextUI 래핑)
│   │   ├── core/        # NextUI 래퍼 (Input, Modal, Button 등)
│   │   ├── common/      # 프로젝트 공통 UI (EmailVerify 등)
│   │   └── [Component]/ # 특정 UI 컴포넌트
│   └── ui_old/          # 레거시 UI (점진적 마이그레이션)
│
├── pages/               # 페이지 컴포넌트 (라우트 단위)
│   └── [feature]/
│       ├── index.tsx    # Container (로직)
│       └── components/  # 페이지 전용 컴포넌트
│
├── services/            # 비즈니스 로직 & API
│   ├── api/            # GraphQL API 훅
│   │   └── [domain]/   # 도메인별 API (user, course, project)
│   │       ├── types.ts
│   │       ├── handlers.ts
│   │       └── use*.ts
│   └── gen/            # GraphQL 자동 생성 파일
│
├── store/              # 전역 상태 관리
│   ├── recoil/         # Recoil atoms
│   └── zustand/        # Zustand stores
│
├── hooks/              # 전역 커스텀 훅
├── lib/                # 외부 라이브러리 래핑
├── locales/            # 다국어 리소스
├── routers/            # 라우팅 설정
├── style/              # 전역 스타일
└── types/              # TypeScript 타입 정의
```

### NextUI 래핑 컴포넌트 구조

#### components/ui/core/ - NextUI 순수 래핑

```typescript
// components/ui/core/input/Input.tsx
import {
  Input as NextuiInput,
  InputProps as NextuiInputProps,
} from '@nextui-org/react';

export type InputProps = NextuiInputProps;

export default function Input({ ...props }: InputProps) {
  return <NextuiInput {...props} />;
}
```

**원칙:**

- NextUI 컴포넌트를 **그대로** 래핑
- 추가 로직 없이 props만 전달
- 타입 re-export

#### components/ui/ - 커스터마이징된 UI

```typescript
// components/ui/Button/EmailVerifyButtonUI.tsx
import { Button } from '@nextui-org/react';

type EmailVerifyButtonProps = {
  isVerified: boolean;
  onVerify: () => void;
  isLoading?: boolean;
};

export default function EmailVerifyButton({
  isVerified,
  onVerify,
  isLoading,
}: EmailVerifyButtonProps) {
  return (
    <Button
      color={isVerified ? 'success' : 'primary'}
      onClick={onVerify}
      isLoading={isLoading}
      className="min-w-[100px]"
    >
      {isVerified ? '인증완료' : '인증하기'}
    </Button>
  );
}
```

**원칙:**

- 특정 비즈니스 로직이 포함된 UI
- NextUI 컴포넌트를 조합하여 재사용 가능하도록 구성
- `UI` suffix 사용 권장

#### components/ui/common/ - 복합 공통 컴포넌트

```typescript
// components/ui/common/EmailVerify/index.tsx
import Input from '@/components/ui/core/input/Input';
import EmailVerifyButton from '@/components/ui/Button/EmailVerifyButtonUI';

type EmailVerifyProps = {
  email: string;
  onEmailChange: (email: string) => void;
  onVerify: () => void;
};

export default function EmailVerify({
  email,
  onEmailChange,
  onVerify,
}: EmailVerifyProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="이메일을 입력하세요"
      />
      <EmailVerifyButton onVerify={onVerify} />
    </div>
  );
}
```

**원칙:**

- 여러 ui 컴포넌트를 조합
- 프로젝트 전역에서 재사용
- 복잡한 UI 패턴 추상화

### 컴포넌트 파일 구조

```
ComponentName/
├── index.tsx              # 메인 컴포넌트
├── ComponentName.types.ts # 타입 정의 (선택)
├── components/            # 하위 컴포넌트 (선택)
│   ├── SubComponent1.tsx
│   └── SubComponent2.tsx
└── hooks/                 # 컴포넌트 전용 훅 (선택)
    └── useComponentLogic.ts
```

---

## 네이밍 컨벤션

### 파일명

| 타입         | 규칙                          | 예시                                |
| ------------ | ----------------------------- | ----------------------------------- |
| **컴포넌트** | PascalCase                    | `UserProfile.tsx`, `CourseCard.tsx` |
| **훅**       | camelCase, `use` prefix       | `useAuth.ts`, `useCourseList.ts`    |
| **유틸리티** | camelCase                     | `formatDate.ts`, `validator.ts`     |
| **타입**     | camelCase or PascalCase       | `user.types.ts`, `Course.ts`        |
| **상수**     | camelCase or UPPER_SNAKE_CASE | `constants.ts`, `API_ENDPOINTS.ts`  |

### 변수 & 함수

```typescript
// ✅ Good: 명확하고 설명적인 이름
const isUserLoggedIn = checkAuth();
const filteredCourses = courses.filter(...);

function handleCourseComplete(courseId: string) { ... }
function calculateProgress(completed: number, total: number) { ... }

// ❌ Bad: 축약형, 불명확한 이름
const usr = getUser();
const data = fetch();
function handle() { ... }
```

### 이벤트 핸들러

```typescript
// ✅ Good: handle[Element][Event] 패턴
const handleButtonClick = () => { ... }
const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { ... }
const handleFormSubmit = () => { ... }
const handleCourseComplete = (id: string) => { ... }

// ❌ Bad
const onClick = () => { ... }
const change = () => { ... }
```

### Boolean 변수

```typescript
// ✅ Good: is/has/should prefix
const isLoading = true;
const hasError = false;
const shouldShowModal = true;
const canEdit = checkPermission();

// ❌ Bad
const loading = true;
const error = false;
```

### GraphQL 네이밍

```typescript
// Query: GET_* prefix
const GET_USER_PROFILE = gql`...`;
const GET_COURSE_LIST = gql`...`;

// Mutation: *_MUTATION suffix
const UPDATE_USER_MUTATION = gql`...`;
const CREATE_COURSE_MUTATION = gql`...`;

// Subscription: *_SUBSCRIPTION suffix
const COURSE_PROGRESS_SUBSCRIPTION = gql`...`;
```

---

## 스타일링 (Tailwind CSS)

### 기본 원칙

1. **Tailwind utility classes 우선 사용**
2. **NextUI 컴포넌트 활용**
3. **커스텀 클래스는 최소화**
4. **반응형 디자인 고려** (`sm:`, `md:` breakpoints)

### Tailwind 커스텀 설정

프로젝트 전용 컬러, 폰트, 간격 등은 `tailwind.config.js`에 정의되어 있습니다.

```typescript
// ✅ Good: Tailwind utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
  <h3 className="text-16 font-semibold text-font-main">제목</h3>
  <p className="text-14 text-font-sub">설명</p>
</div>

// ✅ Good: NextUI 컴포넌트 + Tailwind
import { Button } from '@nextui-org/react';

<Button
  color="primary"
  className="min-w-[120px] font-medium"
>
  확인
</Button>

// ❌ Bad: 인라인 스타일
<div style={{ display: 'flex', padding: '24px' }}>...</div>

// ❌ Bad: CSS 파일 새로 생성
import './CustomComponent.css';
```

### 반응형 디자인

```typescript
// ✅ Good: Tailwind breakpoints 활용
<div
  className="
  w-full
  max-w-[1660px]
  sm:max-w-full
  md:max-w-[1280px]
  mx-auto
  px-4
  sm:px-6
  md:px-8
"
>
  <div
    className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    gap-4
  "
  >
    {/* cards */}
  </div>
</div>
```

### 조건부 스타일링

```typescript
import classnames from 'classnames';

// ✅ Good: classnames 라이브러리 활용
<button
  className={classnames('px-4 py-2 rounded-lg transition-colors', {
    'bg-brand text-white': isActive,
    'bg-form-bg text-font-sub': !isActive,
    'opacity-50 cursor-not-allowed': isDisabled,
  })}
>
  버튼
</button>;
```

### NextUI 테마 활용

```typescript
// tailwind.config.js에 정의된 NextUI 테마 사용
<Button color="primary">     // #FF4547 (brand)
<Button color="secondary">   // #2B2929 (navy)
<Button color="default">     // #DFDFDF (form-disable)
```

---

## 상태 관리

### 상태 관리 전략

| 상태 유형              | 도구                | 사용 예시                |
| ---------------------- | ------------------- | ------------------------ |
| **서버 상태**          | Apollo Client       | GraphQL 데이터, 캐싱     |
| **전역 UI 상태**       | Zustand             | 모달 상태, 사이드바 토글 |
| **복잡한 전역 상태**   | Recoil              | 다중 컴포넌트 공유 상태  |
| **로컬 컴포넌트 상태** | useState/useReducer | 폼 입력, 토글            |

### Apollo Client (서버 상태)

```typescript
import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSES, UPDATE_COURSE } from '@/services/api/course';

export default function CourseList() {
  // Query
  const { data, loading, error, refetch } = useQuery(GET_COURSES);

  // Mutation
  const [updateCourse] = useMutation(UPDATE_COURSE, {
    // Option 1: refetch
    refetchQueries: [{ query: GET_COURSES }],

    // Option 2: cache update
    update(cache, { data }) {
      cache.modify({
        fields: {
          courses(existingCourses = []) {
            return [...existingCourses, data.createCourse];
          },
        },
      });
    },
  });

  // ...
}
```

### Zustand (전역 UI 상태)

```typescript
// store/zustand/modalStore.ts
import create from 'zustand';

type ModalStore = {
  isOpen: boolean;
  modalType: 'login' | 'signup' | null;
  openModal: (type: 'login' | 'signup') => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));

// 사용
import { useModalStore } from '@/store/zustand/modalStore';

function Header() {
  const { openModal } = useModalStore();

  return <Button onClick={() => openModal('login')}>로그인</Button>;
}
```

### useState (로컬 상태)

```typescript
// ✅ Good: 단순 로컬 상태
function CourseFilter() {
  const [selectedStatus, setSelectedStatus] = useState<CourseStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
```

---

## API & GraphQL

### 디렉토리 구조

```
services/api/
├── user/
│   ├── types.ts              # User 관련 타입
│   ├── handlers.ts           # 에러 핸들러 등
│   ├── useSignIn.ts          # 로그인 훅
│   ├── useSignUp.ts          # 회원가입 훅
│   └── useProfile.ts         # 프로필 조회 훅
│
├── course/
│   ├── types.ts
│   ├── useCreateCourse.ts
│   └── useCourseList.ts
│
└── index.ts                  # 전체 export
```

### API 훅 패턴

```typescript
// services/api/user/useSignIn.ts
import { useSignInMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export function useSignIn() {
  const [mutation, { loading }] = useSignInMutation();

  const signIn = async ({
    email,
    password,
    onCompleted,
    onError,
  }: {
    email: string;
    password: string;
    onCompleted?: (data: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: { email, password },
      },
      onCompleted: (data) => {
        onCompleted?.(data);
      },
      onError,
    });
  };

  return { signIn, loading };
}
```

### 사용 예시

```typescript
// pages/login/index.tsx
import { useSignIn } from '@/services/api/user/useSignIn';

export default function LoginPage() {
  const { signIn, loading } = useSignIn();

  const handleSubmit = async (email: string, password: string) => {
    await signIn({
      email,
      password,
      onCompleted: (data) => {
        // 토큰 저장, 리다이렉트 등
        console.log('로그인 성공', data);
      },
      onError: (err) => {
        console.error('로그인 실패', err);
      },
    });
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

### GraphQL 코드 생성

```bash
# 개발 환경
yarn gen

# 프로덕션 환경
yarn gen:prod
```

---

## 다국어 (i18n)

### 기본 원칙

1. **하드코딩된 문자열 금지**
2. **모든 로케일 파일에 동시 추가**
3. **네임스페이스 활용**: `domain.section.key`

### 디렉토리 구조

```
locales/
├── en/
│   └── translation.json
├── ko/
│   └── translation.json
└── ...
```

### 키 네이밍 규칙

```json
{
  "course": {
    "in_progress": {
      "title": "진행 중인 코스",
      "empty_message": "진행 중인 코스가 없습니다",
      "continue_button": "이어서 학습하기"
    },
    "completed": {
      "title": "완료한 코스",
      "review_button": "복습하기"
    }
  },
  "common": {
    "button": {
      "confirm": "확인",
      "cancel": "취소",
      "save": "저장"
    }
  }
}
```

### 사용 방법

```typescript
import { useTranslation } from 'react-i18next';

export default function CourseCard({ course }: Props) {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{course.title}</h3>
      <Button onClick={handleContinue}>
        {t('course.in_progress.continue_button')}
      </Button>
    </div>
  );
}

// ❌ Bad: 하드코딩
<Button>이어서 학습하기</Button>;
```

### 동적 텍스트

```typescript
// translation.json
{
  "course": {
    "progress": "{{completed}} / {{total}} 레슨 완료"
  }
}

// 사용
t('course.progress', { completed: 3, total: 10 })
// 출력: "3 / 10 레슨 완료"
```

---

## Import 순서

```typescript
// 1. 외부 라이브러리
import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

// 2. 내부 모듈 (절대 경로, alias)
import { useAuth } from '@/hooks/useAuth';
import { GET_COURSES } from '@/services/api/course';
import CourseCard from '@/components/CourseCard';

// 3. 타입
import type { Course, CourseStatus } from '@/types';

// 4. 상대 경로
import { filterCourses } from './utils';
import StatusFilter from './components/StatusFilter';
```

---

## 코드 품질 원칙

### 1. DRY (Don't Repeat Yourself)

```typescript
// ❌ Bad: 반복되는 코드
<Button color="primary" className="min-w-[120px] font-medium">확인</Button>
<Button color="primary" className="min-w-[120px] font-medium">저장</Button>
<Button color="primary" className="min-w-[120px] font-medium">전송</Button>

// ✅ Good: 공통 컴포넌트 추출
function PrimaryButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      color="primary"
      className="min-w-[120px] font-medium"
      {...props}
    >
      {children}
    </Button>
  );
}
```

### 2. KISS (Keep It Simple, Stupid)

```typescript
// ❌ Bad: 과도한 추상화
const isValid = checkConditionA() && checkConditionB() && !checkConditionC();

// ✅ Good: 명확한 의도
const hasRequiredFields = checkConditionA();
const hasValidFormat = checkConditionB();
const hasNoErrors = !checkConditionC();
const isValid = hasRequiredFields && hasValidFormat && hasNoErrors;
```

### 3. Early Return

```typescript
// ❌ Bad: 깊은 중첩
function processCourse(course: Course) {
  if (course) {
    if (course.isActive) {
      if (course.hasPermission) {
        // 실제 로직
      }
    }
  }
}

// ✅ Good: Early return
function processCourse(course: Course) {
  if (!course) return;
  if (!course.isActive) return;
  if (!course.hasPermission) return;

  // 실제 로직
}
```

### 4. 성능 최적화

```typescript
// useMemo: 비용이 큰 계산 메모이제이션
const filteredCourses = useMemo(
  () => courses.filter((c) => c.status === selectedStatus),
  [courses, selectedStatus],
);

// useCallback: 함수 참조 유지 (하위 컴포넌트 리렌더 방지)
const handleCourseComplete = useCallback(
  (id: string) => {
    updateCourse({ variables: { id, status: 'complete' } });
  },
  [updateCourse],
);

// React.memo: 컴포넌트 메모이제이션
export default React.memo(CourseCard);
```

### 5. 에러 처리

```typescript
// ✅ Good: 명확한 에러 처리
try {
  const result = await signIn({ email, password });
  // 성공 처리
} catch (error) {
  if (error instanceof ApolloError) {
    // GraphQL 에러 처리
    console.error('API Error:', error.message);
  } else {
    // 기타 에러
    console.error('Unexpected Error:', error);
  }
}

// ✅ Good: Error Boundary 활용
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => window.location.reload()}
>
  <CourseList />
</ErrorBoundary>;
```

### 6. 주석 규칙

```typescript
// ✅ Good: 복잡한 로직에만 주석
// 사용자가 30일 이내에 로그인하지 않으면 세션 만료 처리
const isSessionExpired =
  lastLoginDate &&
  dayjs().diff(lastLoginDate, 'day') > 30;

// ❌ Bad: 불필요한 주석
// 버튼 클릭 핸들러
const handleClick = () => { ... }

// ✅ Good: TODO 주석 (작업 추적)
// TODO: API 연동 후 실제 데이터로 교체
const mockData = [...];

// ✅ Good: JSDoc (공개 API, 유틸리티 함수)
/**
 * 날짜를 "YYYY-MM-DD" 형식으로 포맷팅합니다.
 * @param date - Date 객체 또는 ISO 문자열
 * @returns "YYYY-MM-DD" 형식 문자열
 */
export function formatDate(date: Date | string): string {
  // ...
}
```

### 7. 테스트 가능한 코드

```typescript
// ✅ Good: 순수 함수, 테스트 용이
export function calculateProgress(
  completedLessons: number,
  totalLessons: number,
): number {
  return Math.round((completedLessons / totalLessons) * 100);
}

// ✅ Good: 의존성 주입
function CourseList({ fetchCourses = defaultFetchCourses }: Props) {
  // fetchCourses를 테스트에서 목 함수로 교체 가능
}
```

---

## 참고 자료

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextUI Documentation](https://nextui.org/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/)

---

**마지막 업데이트**: 2026-03-11
