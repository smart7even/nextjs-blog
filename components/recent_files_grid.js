import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentFilesGrid = () => {
    const [recentFiles, setRecentFiles] = useState([]);

    // Fetch recent files
    useEffect(() => {
        const fetchRecentFiles = async () => {
            try {
                const response = await axios.get('/api/record/recents');
                setRecentFiles(response.data);
            } catch (error) {
                console.error('Error fetching recent files:', error);
            }
        };

        fetchRecentFiles();
    }, []);

    // Function to format the file size
    const formatFileSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        } else {
            return bytes + ' bytes';
        }
    };

    // Array of emojis
    const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊'];

    // Function to replace image with a random emoji
    const handleImageError = (e) => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        e.target.replaceWith(document.createTextNode(randomEmoji));
    };

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '20px',
                width: '100%',
            }}
        >
            {recentFiles.map((file) => (
                <div
                    key={file._id}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '10px',
                        margin: '10px',
                        width: '200px',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src={file.thumbnail?.publicUrl}
                        alt={file.name}
                        style={{ width: '100%', height: 'auto' }}
                        onError={handleImageError}
                    />
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {file.name}
                    </div>
                    <div>{formatFileSize(file.size)}</div>
                </div>
            ))}
        </div>
    );
};

export default RecentFilesGrid;
