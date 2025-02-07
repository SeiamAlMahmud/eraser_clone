'use client';
import React, { useEffect, useRef } from 'react';
import { BlockToolConstructable } from '@editorjs/editorjs';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import EditorjsList from '@editorjs/list';
// import Checklist from '@editorjs/checklist'
// import ImageTool from '@editorjs/image';
import CodeBox from '@bomdi/codebox';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Tooltip from 'editorjs-tooltip';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Title from 'title-editorjs';
import ColorPicker from 'editorjs-color-picker';

const Editor = () => {
 
  const ref = useRef<EditorJS | null>(null);
  useEffect(() => {
    initEditor();
  }, []);


  useEffect(() => {
    if (!ref.current) {
      initEditor();
    }

    return () => {
      if (ref.current) {
        ref.current.destroy(); // Cleanup on unmount
        ref.current = null;
      }
    };
  }, []);

  const handleReady = (editor) => {
    new Undo({ editor });
    new DragDrop(editor);
  };

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: {
          class: Header as unknown as BlockToolConstructable,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },
        list: {
          class: EditorjsList as unknown as BlockToolConstructable,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        codeBox: {
          class: CodeBox,
          config: {
            themeURL:
              'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css',
            themeName: 'atom-one-dark',
            useDefaultTheme: 'light',
          },
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M',
        },
        tooltip: {
          class: Tooltip,
          config: {
            location: 'left',
            underline: true,
            placeholder: 'Enter a tooltip',
            highlightColor: '#FFEFD5',
            backgroundColor: '#154360',
            textColor: '#FDFEFE',
            holder: 'editorId',
          },
        },
        paragraph: {
          class: Paragraph as unknown as BlockToolConstructable,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        title: Title,
        ColorPicker: {
          class: ColorPicker as unknown as BlockToolConstructable,
        },
      },
      onReady: () => handleReady(editor), // Here, we use the handleReady function
    });
    ref.current = editor;
  };

  return (
    <div>
      <div id="editorjs" className="ml-5"></div>
    </div>
  );
};

export default Editor;
