import { useState, useEffect } from 'react';
import { Checkbox } from '@nextui-org/react';
import { Fragment } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import useTranslator from '@hooks/useTranslator';
import { useUpdateProfileController } from '@src/pages/my-page/hooks/useUpdateProfileController';

interface UserCodingEditProps {
  coding: string[];
}
export default function UserCodingEdit({ coding }: UserCodingEditProps) {
  const [codingTypes, setCodingTypes] = useState<string[]>(coding);
  const { t } = useTranslator();
  const { onSubmit } = useUpdateProfileController();

  useEffect(() => {
    setCodingTypes(coding.length ? coding : ['None']);
  }, [coding]);

  const checkNone = () => {
    setCodingTypes(codingTypes.includes('None') ? codingTypes : ['None']);
    onSubmit({ codingExperienceTypeList: ['None'] });
  };

  const check = (name: string) => {
    const isChecked = codingTypes.includes(name);
    let updatedList = [...codingTypes];
    if (name === 'None') {
      checkNone();
    } else {
      updatedList = updatedList.filter((type) => type !== 'None');
      if (isChecked) {
        updatedList = updatedList.filter((type) => type !== name);
      } else {
        updatedList.push(name);
      }
      setCodingTypes(updatedList);
      onSubmit({ codingExperienceTypeList: updatedList });
    }
  };

  return (
    <Fragment>
      <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
        <div className="flex sm:flex-col sm:justify-start sm:items-start">
          <Label htmlFor="coding-experience" className="w-[130px] p3-b sm:mb-4 sm:w-full">
            {t('CODING_EXPERIENCE')}
          </Label>
          <div className="flex-col items-start">
            <div className="self-start mb-4">
              <Checkbox
                isSelected={codingTypes.includes('None')}
                onChange={checkNone}
              >
                <p className="p5-r text-font-sub_1 sm:text-13">{t('NONE')}</p>
              </Checkbox>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 min-w-[500px] sm:min-w-[250px]">
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Scratch')}
                  onChange={() => check('Scratch')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('SCRATCH')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Entry')}
                  onChange={() => check('Entry')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('ENTRY')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Python')}
                  onChange={() => check('Python')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('PYTHON')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('AppInventor')}
                  onChange={() => check('AppInventor')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('APP_INVENTOR')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('C')}
                  onChange={() => check('C')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('C_LANG')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Java')}
                  onChange={() => check('Java')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('JAVA_LANG')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Web')}
                  onChange={() => check('Web')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('WEB')}
                  </p>
                </Checkbox>
              </div>
              <div className="mr-2 sm:min-w-[130px]">
                <Checkbox
                  isSelected={codingTypes.includes('Etc')}
                  onChange={() => check('Etc')}
                >
                  <p className="p5-r text-font-sub_1 sm:text-13 whitespace-nowrap">
                    {t('ETC')}
                  </p>
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </Fragment>
  );
}
