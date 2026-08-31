import { useState, useEffect, useCallback } from 'react';
import {
  getProjectCreateTimes,
  storeProjectCreateTimes,
} from '@lib/utils/utils';

const TIME_LIMIT = 5000; // 5초
const MAX_CREATE_COUNT = 5; // 최대 5번

export const useProjectCreateLimit = () => {
  const [createTimes, setCreateTimes] = useState<number[]>(() => {
    const savedTimes = getProjectCreateTimes();
    const now = Date.now();
    return savedTimes.filter((time) => now - time <= TIME_LIMIT);
  });

  // localStorage에 자동 저장
  useEffect(() => {
    storeProjectCreateTimes(createTimes);
  }, [createTimes]);

  // 생성 가능 여부 확인
  const canCreate = useCallback(() => {
    const now = Date.now();
    const recentTimes = createTimes.filter((time) => now - time <= TIME_LIMIT);
    return recentTimes.length < MAX_CREATE_COUNT;
  }, [createTimes]);

  // 생성 기록 추가
  const recordCreate = useCallback(() => {
    setCreateTimes((prev) => [...prev, Date.now()]);
  }, []);

  // 초기화
  const reset = useCallback(() => {
    setCreateTimes([]);
  }, []);

  return {
    canCreate,
    recordCreate,
    reset,
  };
};
