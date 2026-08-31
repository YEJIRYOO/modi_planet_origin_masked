import ClassifierResultItem from '@src/pages/training/voice/components/test-area/test-classifier-result/classifier-result-item';
import { getUuid } from '@src/lib/utils/utils';

interface TestClassifierResult {
  predictResult: Array<[string, number]>;
}

function TestClassifierResult({ predictResult }: TestClassifierResult) {
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
