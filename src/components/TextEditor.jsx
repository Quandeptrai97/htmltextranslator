import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import './textEditor.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { Button } from '@mui/material';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [htmlContent, setHtmlContent] = useState('');

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      console.log(command);
      return 'handled';
    }
    return 'not-handled';
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const updateTextField = () => {
    setHtmlContent(stateToHTML(editorState.getCurrentContent()));
  }

  const handlePastedText = (text, html) => {
    // Assuming the pasted content is tab-separated
    const rows = text.split('\n').map(row => row.split('\t'));

    // Convert the rows into HTML table format
    const htmlContent = `
      <table>
        ${rows.map(row => `
          <tr>
            ${row.map(cell => `<td>${cell}</td>`).join('')}
          </tr>
        `).join('')}
      </table>
    `;
  };

  return (
    <div>
      <div className="button-container">
        <Button onClick={onBoldClick} variant="outlined">Bold</Button>
        <Button onClick={onItalicClick} variant="outlined">Italic</Button>
        <Button onClick={updateTextField} variant="contained">Convert to HTML</Button>
      </div>
      <p>----------------Da Editor----------------</p>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        handlePastedText={handlePastedText}
      />
      <p>-----------------------------------------</p>
      <textarea
        value={htmlContent}
        readOnly
        rows={6}
        style={{ marginTop: '10px', width: '100%', padding: '5px' }}
      />
    </div>
  );
};

export default TextEditor;
