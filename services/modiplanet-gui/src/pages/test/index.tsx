import ButtonUI from '@src/components/ui/Button/ButtonUI';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import InputUI from '@src/components/ui/Input/InputUI';
import CModal from '@components/ui/Modal/CModal';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import CModalTwoButton from '@components/ui/Modal/CModalTwoButton';

interface TestPageProps {}

function TestPage({}: TestPageProps) {
  return (
    <>
      <h3>primary</h3>
      <ButtonUI size="sm">sm 버튼</ButtonUI>
      <ButtonUI bordered>md 버튼</ButtonUI>
      <ButtonUI isDisabled>md 버튼</ButtonUI>
      <ButtonUI bordered size="lg">
        테투리 버튼
      </ButtonUI>
      <ButtonUI bordered size="lg" rounded>
        테투리 버튼
      </ButtonUI>
      <ButtonUI size="lg" rounded>
        테투리 버튼
      </ButtonUI>

      <h3>secondary</h3>
      <ButtonUI color="secondary" size="sm">
        기본버튼
      </ButtonUI>
      <ButtonUI color="secondary" bordered>
        테투리 버튼
      </ButtonUI>
      <ButtonUI color="secondary" bordered size="lg">
        테투리 버튼
      </ButtonUI>

      <h3>default</h3>
      <ButtonUI color="default" size="sm">
        기본버튼
      </ButtonUI>
      <ButtonUI color="default" bordered>
        테투리 버튼
      </ButtonUI>
      <ButtonUI color="default" bordered size="lg">
        테투리 버튼
      </ButtonUI>

      <ButtonUI color="default" bordered size="lg" rounded>
        테투리 버튼
      </ButtonUI>

      <h3>checkbox</h3>
      <CheckboxUI>체크박스는 크게 커스텀 안해도 되겠네요</CheckboxUI>

      <h3>input</h3>
      <InputUI></InputUI>

      <CModal
        isOpen={false}
        title={'타이틀입니다'}
        subTitle={'서브타이틀입니다'}
        innerLayout={'left'}
      >
        버튼 없음
      </CModal>

      <CModalOneButton
        isOpen={false}
        title={'버튼1'}
        subTitle={'1212서브타이틀입니다'}
        innerLayout={'left'}
      >
        버튼1개
      </CModalOneButton>

      <CModalTwoButton
        isOpen={true}
        title={'버튼1'}
        subTitle={'1212서브타이틀입니다'}
        innerLayout={'left'}
      >
        버튼2개
      </CModalTwoButton>
    </>
  );
}

export default TestPage;
