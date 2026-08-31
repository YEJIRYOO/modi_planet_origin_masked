import React, { ReactNode } from 'react';

interface IEditorContent {
  children: ReactNode;
  className?: string;
}

function EditorContent({ children, className }: IEditorContent) {
  return (
    <div className={`toastui-editor-contents ${className}`}>{children}</div>
  );
}

export default EditorContent;
