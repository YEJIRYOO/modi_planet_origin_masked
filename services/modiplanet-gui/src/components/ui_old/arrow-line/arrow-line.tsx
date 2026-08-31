import Xarrow from 'react-xarrows';
import { xarrowPropsType } from 'react-xarrows/lib/types';

interface IArrowLine extends xarrowPropsType {}

function ArrowLine(props: IArrowLine) {
  return <Xarrow strokeWidth={1} color="#ddd" showHead={false} {...props} />;
}

export default ArrowLine;
