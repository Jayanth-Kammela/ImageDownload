import { useState } from 'react'
import axios from 'axios'


const Upload = () => {

    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');


    const forSubmit = async (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('File', image.data)
        const response = await axios.post('http://localhost:8084/post', data)
        response ? setStatus(response.statusText) : null
    }

    const forChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        console.log(img);
        setImage(img)
        console.log(e.target.files);
    }

    return (
        <>
            <div>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <form onSubmit={forSubmit}>
                    <input type='file' name='File' onChange={forChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                {status && <p>{"Image Uploaded--" + status}</p>}
            </div>
        </>
    )
}

export default Upload
