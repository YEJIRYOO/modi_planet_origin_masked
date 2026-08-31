import { MAX_LENGTH_MODEL_NAME } from '@lib/constants/etc';

interface ModelNameInputProps {
  onChange: (value: string) => void;
  name: string;
}

function ModelNameInput({ name, onChange }: ModelNameInputProps) {
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value);
  };

  return (
    <div className="mb-[16px]">
      <input
        className="input w-[560px] font-bold text-[20px] !h-[52px] !p-[14px_20px]"
        type="text"
        maxLength={MAX_LENGTH_MODEL_NAME}
        value={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default ModelNameInput;
