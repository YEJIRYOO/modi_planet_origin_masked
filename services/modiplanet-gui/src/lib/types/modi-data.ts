/**
 * Modi Data Types
 * 모디 데이터 관련 타입 정의
 */

/**
 * 모디 모듈에서 수집된 데이터 포인트
 */
export interface ModiDataPoint {
  date: number; // Unix timestamp
  value: number;
  unit: string;
}

/**
 * 모디 모듈에서 녹화된 원본 데이터 구조
 * (PostMessage로 전달되는 형식)
 */
export interface ModiRecordedData {
  name: string; // 모듈 타입 (e.g., "TOF", "BUTTON", "DIAL")
  function: string; // 기능 타입 (e.g., "cm", "clicked", "degree")
  min: number;
  max: number;
  index: number;
  data: ModiDataPoint[];
}

/**
 * DB에 저장될 모디 데이터 구조
 */
export interface ModiDataInput {
  data: string; // JSON.stringify된 ModiRecordedData
  functionType: string;
  moduleType: string;
  name: string;
}

/**
 * 프론트엔드에서 사용할 모디 데이터 구조 (파싱된 상태)
 * useModiDataConnection에서 반환되는 형식
 */
export interface ModiData {
  id: string;
  name: string;
  functionType: string;
  moduleType: string;
  data: ModiRecordedData; // 파싱된 녹화 데이터
  createdAt: string;
}

/**
 * 모듈 타입
 */
export type ModuleType = 'BUTTON' | 'DIAL' | 'ENVIRONMENT' | 'IMU' | 'JOYSTICK' | 'TOF';
