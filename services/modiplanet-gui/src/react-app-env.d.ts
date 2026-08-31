/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vitest/globals" />

declare module 'swiper/css';
declare module 'swiper/css/*';

declare module 'react-split-pane' {
  import * as React from 'react';

  export interface SplitPaneProps {
    className?: string;
    split?: 'vertical' | 'horizontal';
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    size?: number;
    allowResize?: boolean;
    onDragStarted?: () => void;
    onDragFinished?: () => void;
    children?: React.ReactNode;
  }

  export interface PaneProps {
    size?: string | number;
    className?: string;
    children?: React.ReactNode;
  }

  export class Pane extends React.Component<PaneProps> {}
  const SplitPane: React.ComponentType<SplitPaneProps>;
  export default SplitPane;
}

interface Window {
  IMP: {
    init: (id: string) => void;
    request_pay: (
      params: {
        pg: string;
        pay_method: string;
        merchant_uid: string;
        amount: number;
        name: string;
        buyer_name: string;
        buyer_tel: string;
        buyer_email: string;
        buyer_addr: string;
        buyer_postcode: string | undefined;
        card: { [key: string]: string } | {};
        display: { [key: string]: string } | {};
      },
      callback: (rsp: any) => Promise<void>,
    ) => void;
    certification: (params: {}, callback: (rsp: any) => Promise<void>) => void;
  };
}
