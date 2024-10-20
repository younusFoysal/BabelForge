"use client";

import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useRef } from "react";

const TextDoc = () => {
  
  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    new Quill(editor,{
      theme: 'snow'
    });

   
  }, []);
  return <div className="editor-container" ref={wrapperRef}></div>;
};

export default TextDoc;
