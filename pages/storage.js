import { useCallback, useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
    const [files, setFiles] = useState([]);
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = useCallback((event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }, []);

    const onChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const clearFiles = () => {
        setFiles([]);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const onSubmit = async () => {
        if (!files.length) return;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${password}`,
                },
            });

            if (response.status === 200) {
                setSuccessMessage('Files uploaded successfully.');
            } else {
                setErrorMessage('Failed to upload files.');
            }

            clearFiles();
        } catch (error) {
            setErrorMessage('Error uploading files.');
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <div
                style={{
                    width: '50%',
                    height: 'auto',
                    border: '2px dashed gray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={onDrop}
            >
                <input
                    type="file"
                    onChange={onChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                    multiple
                />
                <label
                    htmlFor="fileInput"
                    style={{
                        cursor: 'pointer',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '12px 20px',
                        margin: '8px 0',
                        border: 'none',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '16px',
                    }}
                >
                    Drag & Drop files or Click to select
                </label>
                {files.length > 0 && (
                    <div style={{ maxHeight: '200px', overflow: 'auto', width: '100%', marginBottom: '10px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {files.map((file, index) => (
                                <li key={index} style={{ marginBottom: '8px' }}>
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <input
                    type="password"
                    placeholder="Enter password"
                    onChange={onPasswordChange}
                    style={{
                        padding: '12px 20px',
                        margin: '8px 0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <button
                        onClick={onSubmit}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#008CBA',
                            color: 'white',
                            padding: '15px 20px',
                            margin: '8px 0',
                            border: 'none',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '16px',
                        }}
                    >
                        ⬆️ Upload
                    </button>
                    <button
                        onClick={clearFiles}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#f44336',
                            color: 'white',
                            padding: '15px 20px',
                            margin: '8px 0',
                            border: 'none',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '16px',
                        }}
                    >
                        🗑️ Clear
                    </button>
                </div>
                {successMessage && (
                    <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
                )}
                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
}
