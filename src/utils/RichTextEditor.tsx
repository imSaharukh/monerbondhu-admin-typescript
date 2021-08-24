import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const RichTextEditor: React.FC<Props> = ({ text, setText }): React.ReactElement => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    return (
        <ReactQuill
            theme="snow"
            value={text}
            onChange={setText}
            modules={modules}
            formats={formats}
        />
    );
};

export default RichTextEditor;
