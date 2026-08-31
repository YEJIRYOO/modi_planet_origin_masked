import React from 'react';

interface IBoardMessage {
  text: string;
}

export function BoardMessage({ text }: IBoardMessage) {
  return <p className="text-center p-5">{text}</p>;
}

export default BoardMessage;
