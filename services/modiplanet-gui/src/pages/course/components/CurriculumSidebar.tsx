import { useNavigate, useLocation } from 'react-router-dom';
import { Divider } from '@nextui-org/divider';
import useTranslator from '@src/components/hooks/useTranslator';
import type { MyCourseDetailQuery } from '@services/gen/gen';

interface CurriculumSidebarProps {
  course: MyCourseDetailQuery['myCourseDetail'] | null;
}

export default function CurriculumSidebar({
  course,
}: CurriculumSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslator();
  const fromLearning = (location.state as any)?.fromLearning === true;
  const fromPage = (location.state as any)?.from as string | undefined;

  return (
    <aside className="w-[260px] border-r border-[#EEEEEE] bg-white shrink-0 flex flex-col h-full">
      {/* 상단 과정 정보 */}
      <div className="py-[24px] px-[16px]">
        <p className="pb-m text-font-sub_2 mb-1">{t('COURSE')}</p>
        <h2 className="p2-b mb-3 break-keep">{course?.name || ''}</h2>
        <div className="flex items-center gap-3">
          <span className="p6-r text-font-sub_1">{t('COURSE_PERIOD')}</span>
          <span className="p6-r">{t('UNLIMITED')}</span>
        </div>
      </div>

      <Divider />

      {/* 메뉴 섹션 */}
      <nav className="flex-1 p-3">
        <ul className="flex flex-col gap-1">
          <li>
            <button className="w-full px-[16px] py-[12px] flex items-center gap-[12px] bg-[#FFF5F5] rounded-[10px] text-[#FF5A5A] transition-colors">
              <div className="flex-shrink-0">
                <img src="/assets/course/curriculum/curriculum-fill.svg" />
              </div>
              <span className="p4-sb">{t('CURRICULUM')}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* 하단 나가기 버튼 */}
      <div className="bg-form-form p-3 border-t">
        <button
          onClick={() => {
            if (fromPage) {
              navigate(fromPage);
            } else if (fromLearning) {
              navigate('/learning-space/courses');
            } else if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
              navigate(-1);
            } else {
              navigate('/learning-space/courses');
            }
          }}
          className="w-full px-[15px] py-[10px] flex items-center gap-[10px]"
        >
          <img src="/assets/course/curriculum/exit.svg" />
          <span className="p4-r text-font-sub_1">{t('EXIT')}</span>
        </button>
      </div>
    </aside>
  );
}
