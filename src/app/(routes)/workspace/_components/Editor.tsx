'use client';
import React, { useEffect } from 'react';
import { BlockToolConstructable } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
const Editor = () => {
  useEffect(() => {
    initEditor();
  }, []);
  const initEditor = () => {
    new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */

      tools: {
        header: {
          class: Header as unknown as BlockToolConstructable,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
          }
        },
        list: {
            class: EditorjsList as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
          },
      },
      holder: 'editorjs',
    });
  };
  return (
    <div>
      <div id="editorjs" className="ml-5"></div>
    </div>
  );
};

export default Editor;
