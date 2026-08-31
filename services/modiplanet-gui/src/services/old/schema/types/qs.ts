// 주문관련 쿼리스트링 타입
export type TQsOptionItem = { optionId: string; optionQty: number };

export type TQsOrderItems = {
  items: Array<{ [k: string]: Array<TQsOptionItem> }>;
};
