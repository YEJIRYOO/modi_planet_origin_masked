import ClassifierResultItem from '@src/pages/training/image/components/test-area/test-classifier-result/classifier-result-item';
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
