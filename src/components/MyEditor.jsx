import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyEditor = (props) => {
    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }
    const [localContent, setLocalContent] = useState('');

    const handleChange = (value) => {
        const modifiedValue = value.replace(/<br>/g, '<br/>');

        setLocalContent(modifiedValue);
    };

    const handleSave = () => {
        props.setContent(localContent)
        props.handleUpdateContent(localContent)
    }

    const handleCancel = () => {
        props.handleCancel()
    }

    const keyboardOptions = {
        bindings: {
            enter: {
                key: 'Enter',
                handler: () => false, // Enter tuşuna basıldığında hiçbir şey yapma
            },
        },
    }

    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
    ];

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'indent',
    ];


    return (
        <div style={{
            width: isMobile() ? "90%" : "90%",
            marginLeft: "auto",
            marginRight: "auto",
        }}>
            <ReactQuill
                style={{ whiteSpace: 'pre-wrap' }}
                preserveWhitespace={true}
                onChange={handleChange}
                formats={formats}
                modules={{
                    toolbar: toolbarOptions
                }}
            />
            <div style={{ textAlign: "center" }}>
                {props.handleUpdateContent && 
                <MDBBtn
                    outline
                    className='me-1 px-2 my-2'
                    color='primary'
                    size='sm'
                    onClick={handleSave}
                >
                    Save
                </MDBBtn>
                }
                {props.handleCancel &&
                    <MDBBtn
                        outline
                        className='me-1 px-2 my-2'
                        color='danger'
                        size='sm'
                        onClick={handleCancel}
                    >
                        Cancel
                    </MDBBtn>
                }
            </div>
        </div>
    );
};

export default MyEditor;
