import CodeEditor from '@/components/Code/CodeEditor';
import React from 'react';

export const metadata = {
  title: 'Code | BabelForge',
  description: 'Code editor for BabelForge',
}

export default function Code() {
  return (
    <div>
      <CodeEditor />
    </div>
  );
}
