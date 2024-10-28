'use client';

import { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './constants';
import Output from './Output';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useTheme } from 'next-themes';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const { resolvedTheme } = useTheme();
  const handle = useFullScreenHandle();

  const onMount = editor => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = language => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="p-4">
      <button onClick={handle.enter}>Enter fullscreen</button>
      <div className="flex space-x-4">
        <FullScreen className="w-full" handle={handle}>
          <button onClick={handle.exit}>Exit fullscreen</button>
          <PanelGroup className="w-full" autoSaveId="example" direction="horizontal">
            <Panel defaultSize={40} minSize={30}>
              <div>
                <LanguageSelector language={language} onSelect={onSelect} />
                <Editor
                  options={{
                    minimap: {
                      enabled: false,
                    },
                  }}
                  height="75vh"
                  theme={resolvedTheme == 'dark' ? 'vs-dark' : 'vs-light'}
                  language={language}
                  defaultValue={CODE_SNIPPETS[language]}
                  onMount={onMount}
                  value={value}
                  onChange={value => setValue(value)}
                />
              </div>
            </Panel>
            <PanelResizeHandle />
            <Panel minSize={30} defaultSize={50}>
              <Output editorRef={editorRef} language={language} />
            </Panel>
          </PanelGroup>
        </FullScreen>
      </div>
    </div>
  );
};

export default CodeEditor;
