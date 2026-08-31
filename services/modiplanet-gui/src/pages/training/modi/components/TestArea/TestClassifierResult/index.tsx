import ClassifierResultItem from '@src/pages/training/modi/components/TestArea/TestClassifierResult/ClassifierResultItem';
import { getUuid } from '@src/lib/utils/utils';

interface ITestClassifierResult {
  predictResult: Array<[string, number]>;
}

function TestClassifierResult({ predictResult }: ITestClassifierResult) {
  return (
    <div className="overflow-y-auto">
      {predictResult.map(([label, floatRate]) => (
        <ClassifierResultItem
          label={label}
          floatRate={floatRate}
          key={getUuid()}
        />
      ))}
    </div>
  );
}

export default TestClassifierResult;
