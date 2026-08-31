import { render, screen } from '@testing-library/react';

import ChipUI from '@src/components/ui/Chip/ChipUI';

const getChipContent = (name: string) => screen.getByText(name);
const getChipBase = (name: string) => getChipContent(name).parentElement;

describe('[공통 UI] 칩', () => {
  test('filled variant는 색상과 크기에 맞는 스타일을 적용한다.', () => {
    render(
      <>
        <ChipUI color="gray">GRAY</ChipUI>
        <ChipUI color="yellow">YELLOW</ChipUI>
        <ChipUI color="green" size="xl">
          GREEN
        </ChipUI>
      </>,
    );

    expect(getChipBase('GRAY')).toHaveClass('bg-form-gray', 'h-[20px]');
    expect(getChipBase('YELLOW')).toHaveClass('bg-sub2_yellow', 'h-[20px]');
    expect(getChipBase('GREEN')).toHaveClass('bg-sub2_green', 'h-[32px]');
    expect(getChipContent('GREEN')).toHaveClass('p4-sb');
  });

  test('light variant는 색상별 테두리형 스타일을 적용한다.', () => {
    render(
      <>
        <ChipUI variant="light" color="red">
          RED
        </ChipUI>
        <ChipUI variant="light" color="green">
          GREEN
        </ChipUI>
        <ChipUI variant="light" color="yellow">
          YELLOW
        </ChipUI>
        <ChipUI variant="light">DEFAULT</ChipUI>
      </>,
    );

    expect(getChipBase('RED')).toHaveClass('bg-brand_4', 'text-brand');
    expect(getChipBase('GREEN')).toHaveClass('bg-[#F4FFFB]', 'text-[#00A879]');
    expect(getChipBase('YELLOW')).toHaveClass(
      'bg-[#FFFAEF]',
      'text-[#F0B000]',
    );
    expect(getChipBase('DEFAULT')).toHaveClass(
      'bg-white',
      'text-[#2B2929]',
      'rounded-[10px]',
    );
  });
});
