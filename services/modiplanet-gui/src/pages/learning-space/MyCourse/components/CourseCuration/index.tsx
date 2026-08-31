import { useEffect, useMemo, useState } from 'react';
import useTranslator from '@src/components/hooks/useTranslator';
import { useCourseRecommends } from '@services/api/course/course/useCourseRecommends';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import { CourseRecommendKind } from '@services/gen/gen';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from '@src/lib/newAssets';
import CourseCard from './CourseCard';

const CARD_GAP = 24;

export default function CourseCuration() {
  const { t } = useTranslator();
  const handleLearningSpaceError = useLearningSpaceErrorHandler();
  const { getCourseRecommends, recommends, loading } = useCourseRecommends({
    onError: (error) => handleLearningSpaceError(error),
  });

  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 1579px)').matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1579px)');
    const handler = (e: MediaQueryListEvent) => {
      setIsLg(e.matches);
      setScrollPositions({});
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cardWidth = isLg ? 284 : 302;
  const itemsPerPage = isLg ? 3 : 4;

  const [scrollPositions, setScrollPositions] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    getCourseRecommends(
      [CourseRecommendKind.Trending, CourseRecommendKind.New],
      4,
    );
  }, []);

  const trendingCourses = useMemo(() => {
    const trendingRecommend = recommends?.find(
      (r) => r.kind === CourseRecommendKind.Trending,
    );
    return trendingRecommend?.courses.slice(0, 4) ?? [];
  }, [recommends]);

  const newCourses = useMemo(() => {
    const newRecommend = recommends?.find(
      (r) => r.kind === CourseRecommendKind.New,
    );
    return newRecommend?.courses.slice(0, 4) ?? [];
  }, [recommends]);

  const handleScroll = (sectionId: string, direction: 'left' | 'right') => {
    const currentPos = scrollPositions[sectionId] || 0;
    const newPos =
      direction === 'left' ? Math.max(0, currentPos - 1) : currentPos + 1;
    setScrollPositions((prev) => ({ ...prev, [sectionId]: newPos }));
  };

  const canScrollLeft = (sectionId: string) =>
    (scrollPositions[sectionId] || 0) > 0;

  const canScrollRight = (total: number, sectionId: string) =>
    (scrollPositions[sectionId] || 0) + itemsPerPage < total;

  const renderSlider = (sectionId: string, courses: typeof trendingCourses) => {
    const currentPos = scrollPositions[sectionId] || 0;
    return (
      <div className="relative">
        {canScrollLeft(sectionId) && (
          <button
            onClick={() => handleScroll(sectionId, 'left')}
            className="group absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[40px] h-[40px] bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand_4 active:bg-brand_3 transition-colors"
          >
            <ChevronLeft
              className="text-font-sub_1 group-hover:text-brand group-active:text-brand"
              width={24}
              height={24}
            />
          </button>
        )}

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -currentPos * (cardWidth + CARD_GAP) }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="grid gap-[24px]"
            style={{
              gridTemplateColumns: `repeat(${courses.length}, ${cardWidth}px)`,
            }}
          >
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </motion.div>
        </div>

        {canScrollRight(courses.length, sectionId) && (
          <button
            onClick={() => handleScroll(sectionId, 'right')}
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
    );
  };

  const hasTrending = trendingCourses.length > 0;
  const hasNew = newCourses.length > 0;

  if (loading || (!hasTrending && !hasNew)) return null;

  return (
    <div className="w-full bg-form-bg px-[60px]">
      <div className="max-w-[1660px] w-[1280px] lg:w-[900px] mx-auto pt-[60px] pb-[40px]">
        <p className="flex h4-b mb-10 text-center justify-center items-center">
          {t('RECOMMEND_COURSE_MSG')}
          <img src="/assets/learning-space/emoji-thumb.svg" />
        </p>
        {/* 요즘 뜨는 과정 */}
        {hasTrending && (
          <div className="mb-[80px]">
            <h2 className="flex items-center p1-b mb-[24px] gap-1">
              {t('TRANDING_COURSES')}
              <img
                className="w-[32px] h-[32px]"
                src="/assets/learning-space/emoji-fire.svg"
              />
            </h2>
            {renderSlider('trending', trendingCourses)}
          </div>
        )}

        {/* 새롭게 나온 과정 */}
        {hasNew && (
          <div>
            <h2 className="flex items-center p1-b mb-[24px] gap-1">
              {t('NEW_COURSES')}
              <img
                className="w-[32px] h-[32px]"
                src="/assets/learning-space/emoji-star.svg"
              />
            </h2>
            {renderSlider('new', newCourses)}
          </div>
        )}
      </div>
    </div>
  );
}
