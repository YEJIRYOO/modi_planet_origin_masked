import { useState, useCallback, useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { Selection } from '@nextui-org/react';
import FilterSection from './components/FilterSection';
import CourseList from './components/CourseList';
import { Divider } from '@nextui-org/divider';
import { useTranslation } from 'react-i18next';
import { useCourseGroupConnection } from '@services/api/course/courseGroup/useCourseGroupConnection';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import {
  CourseStateType,
  ActivityCodingType,
  CourseDifficulty,
} from '@services/gen/gen';
import type { CourseFilterFacet } from '@services/gen/gen';

export default function CoursesTab() {
  const [editor, setEditor] = useState<Selection>(new Set([]));
  const [debouncedEditor, setDebouncedEditor] = useState<Selection>(
    new Set([]),
  );
  const [level, setLevel] = useState<Selection>(new Set([]));
  const [debouncedLevel, setDebouncedLevel] = useState<Selection>(new Set([]));
  const [searchQuery, setSearchQuery] = useState('');
  const [displayQuery, setDisplayQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState<
    CourseFilterFacet | null | undefined
  >(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setEditor(new Set([]));
    setDebouncedEditor(new Set([]));
    setLevel(new Set([]));
    setDebouncedLevel(new Set([]));
    setSearchQuery('');
    setDisplayQuery('');
    setFilterCourse(null);
  }, [i18n.language]);

  const debouncedSetEditor = useCallback(
    debounce((keys: Selection) => {
      setDebouncedEditor(keys);
    }, 300),
    [],
  );

  const debouncedSetLevel = useCallback(
    debounce((keys: Selection) => {
      setDebouncedLevel(keys);
    }, 300),
    [],
  );

  const handleEditorChange = (keys: Selection) => {
    setEditor(keys);
    debouncedSetEditor(keys);
  };

  const handleLevelChange = (keys: Selection) => {
    setLevel(keys);
    debouncedSetLevel(keys);
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 1000),
    [],
  );

  const handleSearchChange = (text: string) => {
    setDisplayQuery(text);
    debouncedSetSearchQuery(text);
  };

  const where = useMemo(
    () => ({
      state: CourseStateType.On,
      codeEditorTypes:
        debouncedEditor !== 'all' && [...debouncedEditor].length > 0
          ? ([...debouncedEditor] as ActivityCodingType[])
          : undefined,
      difficulties:
        debouncedLevel !== 'all' && [...debouncedLevel].length > 0
          ? ([...debouncedLevel] as CourseDifficulty[])
          : undefined,
      keyword: searchQuery || undefined,
    }),
    [debouncedEditor, debouncedLevel, searchQuery],
  );

  const handleLearningSpaceError = useLearningSpaceErrorHandler();
  const { courseGroups, filterCourse: queryFilterCourse, loading, hasNextPage, loadMore } =
    useCourseGroupConnection({
      where,
      onError: (error) => handleLearningSpaceError(error),
    });

  useEffect(() => {
    if (!loading) {
      setFilterCourse(queryFilterCourse);
    }
  }, [queryFilterCourse, loading]);

  return (
    <div className="w-full pb-[30px] sm:pb-[20px]">
      <div className="sticky top-0 z-10 bg-white pt-[30px] sm:pt-[20px]">
        <div className="px-[60px]">
          <div className="max-w-[1660px] w-[1280px] lg:w-[900px] mx-auto">
            <p className="h2-b mb-[30px]">{t('LEARNING_MATERIALS')}</p>
            <FilterSection
              editor={editor}
              level={level}
              searchQuery={displayQuery}
              filterCourse={filterCourse}
              onEditorChange={handleEditorChange}
              onLevelChange={handleLevelChange}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>

        <Divider />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="px-[60px]">
        <div className="max-w-[1660px] w-[1280px] lg:w-[900px] mx-auto py-[60px]">
          {loading && courseGroups.length === 0 ? (
            <div className="flex-center w-full py-[60px]">
              <img
                src="/assets/loading/spinner-loading.gif"
                className="w-[100px] h-[100px]"
              />
            </div>
          ) : courseGroups.length > 0 ? (
            <CourseList
              courseGroups={courseGroups}
              hasNextPage={hasNextPage}
              loadMore={loadMore}
            />
          ) : (
            <div className="flex-col flex-center">
              <img
                src="/assets/error/no-data.svg"
                className="w-[144px] h-[144px] mb-4"
              />
              <p className="p3-r">{t('NO_COURSES')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
