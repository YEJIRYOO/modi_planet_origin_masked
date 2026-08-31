import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@src/lib/newAssets';
import CourseCard from '@src/pages/learning-space/MyCourse/components/CourseCuration/CourseCard';
import type { CourseCardModel } from '@services/client-model/course';
import type { CourseGroupModel } from '@services/client-model/course';
import { useTranslation } from 'react-i18next';

const CARD_GAP = 24;

interface CourseListProps {
  courseGroups: CourseGroupModel[];
  hasNextPage: boolean;
  loadMore: () => void;
}

export default function CourseList({
  courseGroups,
  hasNextPage,
  loadMore,
}: CourseListProps) {
  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 1579px)').matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1579px)');
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cardWidth = isLg ? 284 : 302;
  const itemsPerPage = isLg ? 3 : 4;

  const [scrollPositions, setScrollPositions] = useState<
    Record<string, number>
  >({});

  const { t } = useTranslation();

  // 무한 스크롤
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        loadMore();
      }
    },
    [hasNextPage, loadMore],
  );

  useEffect(() => {
    const element = loadMoreTriggerRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '100px',
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const handleScroll = (groupId: string, direction: 'left' | 'right') => {
    const currentPos = scrollPositions[groupId] || 0;
    const newPos =
      direction === 'left' ? Math.max(0, currentPos - 1) : currentPos + 1;

    setScrollPositions((prev) => ({
      ...prev,
      [groupId]: newPos,
    }));
  };

  const canScrollLeft = (groupId: string) => {
    return (scrollPositions[groupId] || 0) > 0;
  };

  const canScrollRight = (courses: CourseCardModel[], groupId: string) => {
    const currentPos = scrollPositions[groupId] || 0;
    return currentPos + itemsPerPage < courses.length;
  };

  return (
    <>
      <div className="space-y-[60px]">
        {courseGroups.map((group) => {
          const currentPos = scrollPositions[group.id] || 0;

          return (
            <div key={group.id}>
              {/* 그룹 헤더 */}
              <div className="mb-[24px]">
                <h2 className="p1-b mb-[12px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {group.name}
                </h2>
                <p className="p3-m text-font-sub_1 break-keep">
                  {group.description}
                </p>
              </div>

              {/* 카드 리스트 */}
              {group.courses.length === 0 ? (
                <div className="h-[202px] rounded-[20px] bg-brand_4 flex flex-col items-center justify-center">
                  <img
                    src="/assets/error/no-data.svg"
                    className="w-[120px] h-[120px] mb-3"
                  />
                  <p className="p3-r">{t('NO_COURSES')}</p>
                </div>
              ) : (
                <div className="relative">
                  {/* 왼쪽 화살표 */}
                  {canScrollLeft(group.id) && (
                    <button
                      onClick={() => handleScroll(group.id, 'left')}
                      className="group absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand_4 active:bg-brand_3 transition-colors"
                    >
                      <ChevronLeft
                        className="text-font-sub_1 group-hover:text-brand group-active:text-brand"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}

                  {/* 카드 그리드 */}
                  <div className="overflow-hidden">
                    <motion.div
                      animate={{
                        x: -currentPos * (cardWidth + CARD_GAP),
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="grid gap-[24px]"
                      style={{
                        gridTemplateColumns: `repeat(${group.courses.length}, ${cardWidth}px)`,
                      }}
                    >
                      {group.courses.map((course) => (
                        <CourseCard key={course.id} {...course} />
                      ))}
                    </motion.div>
                  </div>

                  {/* 오른쪽 화살표 */}
                  {canScrollRight(group.courses, group.id) && (
                    <button
                      onClick={() => handleScroll(group.id, 'right')}
                      className="group absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand_4 active:bg-brand_3 transition-colors"
                    >
                      <ChevronRight
                        className="text-font-sub_1 group-hover:text-brand group-active:text-brand"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 무한 스크롤 sentinel */}
      {hasNextPage && <div ref={loadMoreTriggerRef} className="h-1" />}
    </>
  );
}
