import NumberFormat, { NumberFormatProps } from 'react-number-format';

interface INumberInput extends NumberFormatProps {}

function NumberInput({ ...rest }: INumberInput) {
  return <NumberFormat {...rest} />;
}

export default NumberInput;
