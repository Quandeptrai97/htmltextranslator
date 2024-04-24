import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKTextEditor = () => {
    const initialData = `
            <p>When I see your face</p>
            <p>There's not a thing that I would change</p>
            <p>'Cause you're <strong>amazing</strong></p>
            <p>Just the way you are ( •̀ ω •́ )✧</p>
            <p>---------------</p>
            <p>And when you smile</p>
            <p>The whole world stops and stares for a while</p>
            <p>'Cause you're <strong>amazing</strong></p>
            <p>Just the way you are!!!</p>
    `;
    const [ckEditorState, setCkEditorState] = useState(initialData);
    const [ckEditor2State, setCkEditor2State] = useState('');
    const editorConfig = {
        dataProcessor: {
            toData: htmlData => {
                // Escape HTML tags using a simple replacement function
                return htmlData.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
        },
    };

    function transformHTML(string, tags) {
        const tdRegex = /<td>(.*?)<\/td>/g;
        console.log(string);
        const result = string.replace(tdRegex, (row) => {
            const tdTagRegex = new RegExp(`<td>`,'g');
            row = row.replace(tdTagRegex,'');
            const tdEndTagRegex = new RegExp(`<\/td>`,'g');
            row = row.replace(tdEndTagRegex,'');
            row = autoParagraph(row);
            row = replaceTags(row, tags);
            row = `<td>` + row + `<\/td>`
            console.log(row);
            return row;
        })

        // if (rows != null) {
        //     rows.map((row) => {
        //         const tdTagRegex = new RegExp(`<td>`,'g');
        //         row = row.replace(tdTagRegex,'');
        //         const tdEndTagRegex = new RegExp(`<\/td>`,'g');
        //         row = row.replace(tdEndTagRegex,'');
        //         row = autoParagraph(row);
        //         console.log(row);
        //         return row;
        //     });
        // }

        return result;
    }

    function autoParagraph(string) {
        const paragraphs = string.split(/<br\s*\/?>|\n/);
        const formattedText = paragraphs.map((paragraph) => (
            `<p>${paragraph}</p>`
        ));
        const concatenatedText = formattedText.join('');
        return concatenatedText;
    }
    
    function replaceTags(string, tags) {
        tags.forEach(tag => {
            const regex = new RegExp(`<${tag}>`, 'g');
            string = string.replace(regex, `&lt;${tag}&gt;`);

            const closingRegex = new RegExp(`</${tag}>`, 'g');
            string = string.replace(closingRegex, `&lt;\/${tag}&gt;`);
        })
        return string;
    }

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data={ckEditorState}
                config={editorConfig}
                rows="5"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor.getData());
                }}
                onChange={(event, editor) => {
                    setCkEditorState(editor.getData());
                    console.log(ckEditorState);
                    let rawData = editor.getData();
                    const replacedString = transformHTML(rawData, ['p', 'strong', 'a']);
                    setCkEditor2State(replacedString);
                }}
            />
            <p>------------------CK Editor 2------------------</p>
            <CKEditor
                editor={ClassicEditor}
                data={ckEditor2State}
                disabled='true'
            />
        </>
    );
};

export default CKTextEditor;