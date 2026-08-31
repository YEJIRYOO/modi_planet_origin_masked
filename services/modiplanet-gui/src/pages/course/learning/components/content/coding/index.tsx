import { useCallback, useRef, useState, useEffect, useMemo } from 'react';

import LearningPageFooter from '../../LearningPageFooter';
import StepNavButtons from '../../StepNavButtons';
import FullscreenToggle from '../../FullscreenToggle';
import Curriculum from '@src/lib/newAssets/curriculum';
import useTranslator from '@src/components/hooks/useTranslator';
import { ActivityCodingType } from '@services/gen/gen';
import { MOCKLY_URL } from '@src/lib/constants/urls';

interface CodingContentProps {
  learningObjective: string;
  activity: string;
  codeEditorType?: ActivityCodingType;
  stepId?: string;
  onPrevStep: () => void;
  onNextStep: () => void;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  hasPrevLesson?: boolean;
  hasNextLesson?: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
}

function hasContent(html: string | undefined | null): boolean {
  if (!html) return false;
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.length > 0;
}

const MIN_LEFT_WIDTH = 200;
const MAX_LEFT_RATIO = 0.7;

const CHEVRON_SVG = `<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
const LIGHT_BULB_SVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1019 12.5254H7.91381C7.46944 12.5254 7.10381 12.8854 7.10944 13.3298V15.5179C7.10944 15.9623 7.46944 16.3223 7.91381 16.3223H8.05339C8.24042 16.6546 8.59652 16.8791 9.00506 16.8791C9.4136 16.8791 9.76971 16.6546 9.95674 16.3223H10.1019C10.5463 16.3223 10.9063 15.9623 10.9063 15.5179V13.3298C10.9063 12.8854 10.5463 12.5254 10.1019 12.5254Z" fill="#ACACAC"/><path d="M10.3869 13.0087C10.5219 13.0087 10.6287 12.9074 10.64 12.778C10.64 12.001 11.6249 12.001 12.3749 11.251C13.8599 9.76593 13.8744 7.0593 13.8744 7.0593C13.8744 7.0593 13.8912 6.0843 13.8912 6.02805V6.02242V6.0168C13.8912 5.98867 13.8912 5.9718 13.8912 5.9718C13.8575 3.28305 11.6806 1.12305 8.9975 1.12305C6.31437 1.12305 4.1375 3.28305 4.10938 5.96055L4.12625 7.07055C4.12625 7.07055 4.14419 9.7703 5.62486 11.251C6.37486 12.001 7.3775 12.001 7.3775 12.778C7.38875 12.9074 7.49562 13.0087 7.63062 13.0087H10.3869Z" fill="#FFC629"/><path d="M9.00094 6.76758C9.00094 6.76758 11.4047 6.75445 11.4159 7.6657V7.7107C11.4159 7.72758 11.4159 7.75008 11.4103 7.78383C11.3822 8.25633 10.4016 10.2007 10.0303 10.4932L9.99094 10.5213L9.95719 10.5551C9.33844 11.2413 9.20906 11.4851 9.18656 12.4413H8.82094C8.79281 11.4851 8.65781 11.2413 8.03906 10.5551L8.00531 10.5213L7.96594 10.4932C7.59469 10.2007 6.61406 8.26195 6.58594 7.77258C6.58594 7.75008 6.58031 7.7332 6.58031 7.72195V7.67133C6.59719 6.76008 9.00094 6.76758 9.00094 6.76758ZM9.00094 6.20508C9.00094 6.20508 6.03469 6.43945 6.02344 7.66008C6.02344 7.66008 6.02344 7.72195 6.02906 7.8232C6.06844 8.4757 7.13906 10.5495 7.62281 10.932C8.29781 11.6857 8.26406 13.0095 8.26406 13.0095H9.74906C9.74906 13.0095 9.70406 11.6857 10.3847 10.9376C10.8684 10.5551 11.9391 8.4757 11.9784 7.81758C11.9841 7.7557 11.9841 7.71633 11.9841 7.6882C11.9841 7.67695 11.9841 7.6657 11.9841 7.6657C11.9672 6.43945 9.00094 6.20508 9.00094 6.20508Z" fill="#FFA40D"/><path d="M10.9492 14.0896C11.1022 14.0628 11.2045 13.917 11.1777 13.764C11.1509 13.611 11.0052 13.5087 10.8522 13.5355L7.06092 14.1993C6.90792 14.226 6.8056 14.3718 6.83239 14.5248C6.85917 14.6778 7.00492 14.7801 7.15792 14.7533L10.9492 14.0896ZM10.9213 15.2989C11.0742 15.272 11.1764 15.1262 11.1495 14.9732C11.1226 14.8202 10.9768 14.718 10.8238 14.7449L7.08317 15.4031C6.93019 15.43 6.828 15.5758 6.85491 15.7288C6.88183 15.8818 7.02766 15.984 7.18064 15.9571L10.9213 15.2989Z" fill="#E4E4E4"/><path d="M6.15208 3.27222C5.82563 3.81947 5.99032 4.50352 6.5197 4.7971C7.04908 5.09067 7.74022 4.8883 8.06667 4.34106C8.39312 3.79381 8.22842 3.10976 7.69905 2.81619C7.16967 2.52261 6.47853 2.72498 6.15208 3.27222Z" fill="#FFF0C8"/><path d="M5.28797 5.55075C5.12281 5.82763 5.20614 6.17372 5.47397 6.32225C5.7418 6.47078 6.09148 6.36839 6.25664 6.09152C6.42181 5.81465 6.33848 5.46856 6.07065 5.32002C5.80281 5.17149 5.45314 5.27388 5.28797 5.55075Z" fill="#FFF0C8"/></svg>`;
const ANSWER_ICON_SVG = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.125" y="1.125" width="15.75" height="15.75" rx="4.5" fill="#00C08A"/><path d="M7.55205 12.75C7.35088 12.75 7.14972 12.6732 6.99606 12.5192L3.98024 9.49703C3.67325 9.1894 3.67325 8.69036 3.98024 8.38272C4.28723 8.07509 4.78522 8.07509 5.09221 8.38272L7.55205 10.8477L12.9078 5.48073C13.2148 5.17309 13.7128 5.17309 14.0198 5.48073C14.3267 5.78836 14.3267 6.2874 14.0198 6.59503L8.10803 12.5192C7.9547 12.6732 7.75321 12.75 7.55205 12.75Z" fill="white"/></svg>`;

function enhanceTiptapContent(container: HTMLElement) {
  container.querySelectorAll<HTMLAnchorElement>('a').forEach((el) => {
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // 1) details/toggle: 처음에 닫힌 상태
  container.querySelectorAll('details').forEach((el) => {
    el.removeAttribute('open');
  });

  // 2) hint/answer 인터랙션
  container
    .querySelectorAll<HTMLElement>('[data-hint-answer]')
    .forEach((el) => {
      if (el.classList.contains('tiptap-hint-enhanced')) return;

      const hintContent = el.querySelector(
        '[data-hint-content]',
      ) as HTMLElement | null;
      const answerContent = el.querySelector(
        '[data-answer-content]',
      ) as HTMLElement | null;
      if (!hintContent || !answerContent) return;

      const originalHintHTML = hintContent.innerHTML;
      const originalAnswerHTML = answerContent.innerHTML;

      el.innerHTML = '';
      el.classList.add('tiptap-hint-enhanced', 'tiptap-hint-answer', 'closed');

      const hintHeader = document.createElement('div');
      hintHeader.className = 'hint-header';
      hintHeader.innerHTML = `<span class="hint-title">${LIGHT_BULB_SVG}<span style="font-size:14px;">힌트 확인하기</span></span>${CHEVRON_SVG}`;

      const hintBody = document.createElement('div');
      hintBody.className = 'hint-body';
      hintBody.innerHTML = originalHintHTML;

      const divider = document.createElement('div');
      divider.className = 'container-divider';

      const answerSection = document.createElement('div');
      answerSection.className = 'answer-section';

      const answerHeader = document.createElement('div');
      answerHeader.className = 'answer-header';
      answerHeader.innerHTML = `<span class="answer-title">${ANSWER_ICON_SVG}<span style="font-size:14px;">정답 확인하기</span></span>${CHEVRON_SVG}`;

      const answerBody = document.createElement('div');
      answerBody.className = 'answer-body';
      answerBody.innerHTML = originalAnswerHTML;

      answerSection.appendChild(answerHeader);
      answerSection.appendChild(answerBody);

      el.appendChild(hintHeader);
      el.appendChild(hintBody);
      el.appendChild(divider);
      el.appendChild(answerSection);

      hintHeader.addEventListener('click', () => {
        const isClosed = el.classList.contains('closed');
        if (isClosed) {
          el.classList.remove('closed');
          hintBody.classList.add('open');
          hintHeader.querySelector('.chevron-icon')?.classList.add('open');
          answerSection.classList.add('visible');
        } else {
          el.classList.add('closed');
          hintBody.classList.remove('open');
          hintHeader.querySelector('.chevron-icon')?.classList.remove('open');
          answerSection.classList.remove('visible');
          answerBody.classList.remove('open');
          answerHeader.querySelector('.chevron-icon')?.classList.remove('open');
        }
      });

      answerHeader.addEventListener('click', () => {
        const isOpen = answerBody.classList.contains('open');
        if (isOpen) {
          answerBody.classList.remove('open');
          answerHeader.querySelector('.chevron-icon')?.classList.remove('open');
        } else {
          answerBody.classList.add('open');
          answerHeader.querySelector('.chevron-icon')?.classList.add('open');
        }
      });
    });
}

export default function CodingContent({
  learningObjective,
  activity,
  codeEditorType,
  onPrevStep,
  onNextStep,
  hasPrevStep,
  hasNextStep,
  onToggleFullscreen,
  isFullscreen,
  isFirstStep,
  isLastStep,
  hasPrevLesson,
  hasNextLesson,
  onPrevLesson,
  onNextLesson,
}: CodingContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const { t, i18n } = useTranslator();

  const iframeSrc = useMemo(() => {
    const mode = codeEditorType === ActivityCodingType.AiBlock ? 'ai' : 'block';
    const locale = i18n.language;
    return `${MOCKLY_URL}?sidebar=hide&header=hide&mode=${mode}&locale=${locale}&blockly_scale=0.8&is_lms=true`;
  }, [codeEditorType, i18n.language]);

  useEffect(() => {
    if (!leftPanelRef.current) return;
    leftPanelRef.current
      .querySelectorAll<HTMLElement>('.tiptap-content')
      .forEach(enhanceTiptapContent);
  }, [learningObjective, activity]);

  useEffect(() => {
    const el = leftPanelRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      el.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('is-scrolling'), 1000);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const onMouseMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxWidth = rect.width * MAX_LEFT_RATIO;
      const newWidth = Math.min(
        Math.max(ev.clientX - rect.left, MIN_LEFT_WIDTH),
        maxWidth,
      );
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div ref={containerRef} className="flex-1 flex overflow-hidden bg-white">
        <div
          ref={leftPanelRef}
          className="h-full overflow-auto autohide-scroll bg-white flex-shrink-0"
          style={{ width: leftWidth }}
        >
          <div className="sticky top-0 z-10 bg-white h-[56px] p-3 flex items-center gap-2 border-b">
            <div className="flex-shrink-0 bg-[#FFF1CA] rounded-[4px] p-1 text-[#F9AF05]">
              <Curriculum.Training className="w-[24px] h-[24px] fill-current" />
            </div>
            <span className="p2-b">{t('PRACTICE')}</span>
          </div>
          <div className="flex flex-col gap-0">
            {hasContent(learningObjective) && (
              <div
                className="p-3 text-[14px] tiptap-content"
                dangerouslySetInnerHTML={{ __html: learningObjective }}
              />
            )}
            {hasContent(learningObjective) && hasContent(activity) && (
              <hr className="border-form-border" />
            )}
            {hasContent(activity) && (
              <div
                className="p-3 text-[14px] bg-form-bg tiptap-content"
                dangerouslySetInnerHTML={{ __html: activity }}
              />
            )}
          </div>
        </div>

        <div
          onMouseDown={handleMouseDown}
          className={`h-full w-3 bg-form-border hover:bg-gray-200 cursor-col-resize flex-shrink-0 transition-colors select-none flex items-center justify-center gap-[3px] ${
            isDragging ? 'bg-gray-200' : ''
          }`}
        >
          <div className="w-0 h-3 border-l border-font-sub_2" />
          <div className="w-0 h-3 border-l border-font-sub_2" />
        </div>

        <div
          className="h-full bg-white flex-1 overflow-hidden pt-3"
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        >
          <iframe
            key="moditor-iframe"
            src={iframeSrc}
            className="w-full h-full border-0"
            allow="serial; usb; bluetooth *; camera *; microphone *"
          />
        </div>
      </div>

      {!isFullscreen && (
        <div className="shrink-0 h-[52px] flex items-center justify-end px-6 border-t border-[#EEEEEE] bg-white">
          <FullscreenToggle
            isFullscreen={isFullscreen}
            onToggle={onToggleFullscreen}
          />
        </div>
      )}

      {isFullscreen ? (
        <footer className="shrink-0 h-[60px] flex items-center justify-between px-[24px] border-t border-[#EEEEEE] bg-white">
          <StepNavButtons
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            hasPrevStep={hasPrevStep}
            hasNextStep={hasNextStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            hasPrevLesson={hasPrevLesson}
            hasNextLesson={hasNextLesson}
            onPrevLesson={onPrevLesson}
            onNextLesson={onNextLesson}
            between={<div className="flex-1" />}
            beforeNext={
              <FullscreenToggle
                isFullscreen={isFullscreen}
                onToggle={onToggleFullscreen}
              />
            }
          />
        </footer>
      ) : (
        <LearningPageFooter
          currentPage={1}
          totalPages={1}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
          hasPrevStep={hasPrevStep}
          hasNextStep={hasNextStep}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          showPagination={false}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          hasPrevLesson={hasPrevLesson}
          hasNextLesson={hasNextLesson}
          onPrevLesson={onPrevLesson}
          onNextLesson={onNextLesson}
        />
      )}
    </div>
  );
}
