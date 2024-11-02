"use client";

import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import useAxiosCommon from "@/lib/axiosCommon";
import { useUser } from "@clerk/nextjs";

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
  const { user, isLoaded, isSignedIn } = useUser();
    const uemail = user?.primaryEmailAddress?.emailAddress

  const [quill, setQuill] = useState(null);
  const axiosCommon = useAxiosCommon()

  const saveDocument = async () => {
    if (!quill) return;

    const content = quill.getContents();
    try {
      //console.log(content);

      const data = {
        content,
        email: uemail
      }

      // Send email with the content
      const response = await axiosCommon.post('/document/documents', data);
      const docId = response.data.docId;
      //console.log("Document saved with ID:", docId);

      const shareableLink = `${window.location.origin}/dashboard/doc/${docId}`;
      //console.log("Shareable Link:", shareableLink);
      alert(`Shareable Link: ${shareableLink}`);
    } catch (error) {
      console.error("Error saving document:", error);
    }
};


  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = '';  
    const editor = document.createElement('div');
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    setQuill(q);  
  }, []);

  return (
    <div>
    <div className="flex justify-end">
    <button className="text-end" onClick={saveDocument}>Save</button>
    </div>
      <div className="editor-container" ref={wrapperRef}></div>
    </div>
  );
};

export default TextDoc;
