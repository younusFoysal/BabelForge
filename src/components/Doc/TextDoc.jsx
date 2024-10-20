"use client";

import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client';

const TOOLBAR_OPTIONS = [
  [{header: [1,2,3,4,5,6,false]}],
  [{font: []}],
  [{list: 'ordered'}, {list: 'bullet'}],
  ['bold', 'italic', 'underline'],
  [{color: []}, {background: []}],
  [{script: 'sub'}, {script: 'super'}],
  [{align: []}],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
  ['link'],
  ['formula'],
]

const TextDoc = () => {
  const [socket, setSocket] = useState();
  const [Quill, setQuill] = useState();

  useEffect(()=>{
    const soc = io('http://localhost:3001');
        setSocket(soc);
    return ()=>{
      soc.disconnect();
    }
  },[])

  useEffect(()=>{
    if(Quill == null || socket == null) return;
    Quill.on('text-change', (delta, oldDelta, source)=>{
      if(source !== 'user') return;
      socket.emit('send-changes', delta);
    })

    return ()=>{
      Quill.off('text-change');
    }

  },[])
  
  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q =  new Quill(editor,{
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS
      }
    });
      setQuill(q);
   
  }, []);
  return <div className="editor-container" ref={wrapperRef}></div>;
};

export default TextDoc;
