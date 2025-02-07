'use client';
import React, { useEffect, useRef, useState } from 'react';
import { BlockToolConstructable } from '@editorjs/editorjs';
// @ts-nocheck
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

type BlockType = 'paragraph' | 'header' | 'list' | 'quote';

type BlockData =
  | { text: string; level?: number } // Header Block
  | { text: string } // Paragraph Block
  | { items: string[]; style: 'unordered' | 'ordered' } // List Block
  | { text: string; caption?: string }; // Quote Block;

type EditorDocument = {
  time: number;
  blocks: Array<{
    id?: string;
    type: BlockType;
    data: BlockData;
  }>;
  version: string;
};

const rawDocument: EditorDocument = {
  time: 1550476186479,
  blocks: [
    {
      id: '123',
      type: 'header',
      data: {
        text: 'Document Name',
        level: 2,
      },
    },
    {
      id: '1234',
      type: 'header',
      data: {
        text: '',
        level: 4,
      },
    },
  ],
  version: '2.8.1',
};

interface EditorProps {
  triggerSave: boolean;
}
const Editor: React.FC<EditorProps> = ({ triggerSave }) => {
  const ref = useRef<EditorJS | null>(null);
  const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    initEditor();
  }, []);
  console.log(setDocument);
  useEffect(() => {
    console.log(triggerSave, 'triggerSave');
    if (triggerSave) {
      onSaveDocumet();
    }
  }, [triggerSave]);

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
      data: document,
      tools: {
        header: {
          class: Header as unknown as BlockToolConstructable,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2,
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

  const onSaveDocumet = () => {
    if (ref.current) {
      // const editor = new EditorJS(); unsued line

      ref.current
        .save()
        .then((outputData) => {
          console.log('Article data: ', outputData);
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs" className="ml-5"></div>
    </div>
  );
};

export default Editor;
