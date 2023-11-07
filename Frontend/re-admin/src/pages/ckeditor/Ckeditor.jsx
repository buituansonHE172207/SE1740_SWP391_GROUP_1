import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {Editor as ClassicEditor} from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'


const Ckeditor = ({name, editorData, setEditorData}) => {

    return (
        <div>
            <div className="ckeditor">
                <div className='name'>{name}</div>
                <CKEditor
                    editor={Editor}
                    data={editorData}
                    onChange={(event, editor) => {
                        setEditorData(event, editor)
                    }}
                />
            </div>
        </div>
    )
}

export default Ckeditor;