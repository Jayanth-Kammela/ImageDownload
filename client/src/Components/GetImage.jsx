import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetImage = () => {
    const [data, setData] = useState([]);
    const [rotate, setRotate] = useState({});

    useEffect(() => {
        forGet();
    }, []);

    const forGet = async () => {
        try {
            const response = await axios.get('http://localhost:8084/');
            setData(response.data);
            const initialrotate = {};
            response.data.forEach(image => {
                initialrotate[image._id] =  0;
            });
            setRotate(initialrotate);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleRotate = (id) => {
        const rotatedValue = (rotate[id] +  90) %  360;
        setRotate(prevrotate => ({
            ...prevrotate,
            [id]: rotatedValue,
        }));
    };

    const handleDownload = async (image) => {
        try {
            const response = await axios.get(`http://localhost:8084/${image.File}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', image.File);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error( error.message);
        }
    };

    return (
        <>
            {data.map((image) => (
                <div key={image._id} style={{ display: 'inline-block', margin: '10px' }}>
                    <img
                        src={`http://localhost:8084/${image.File}`}
                        alt=""
                        style={{ transform: `rotate(${rotate[image._id]}deg)`, width:  400, height:  400 }}
                    />
                    <button onClick={() => handleRotate(image._id)}>Rotate</button>
                    <button onClick={() => handleDownload(image)}>Download</button>
                </div>
            ))}
        </>
    );
};

export default GetImage;
