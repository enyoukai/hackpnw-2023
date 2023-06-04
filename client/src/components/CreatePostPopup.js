import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

export function CreatePostPopup({ onClose }) {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        body: ''
    });  

    const onDrop = useCallback(acceptedFiles => {
        setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    // Do something with the files
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	const handlePostChange = (e) => {
		const { name, value } = e.target;
		setPostData((prevData) => ({ ...prevData, [name]: value }));

	};

    async function handleSubmit(e)
    {
        e.preventDefault();

        try {
            const response = await axios.post('/posts', postData);
            console.log(response.data);
            setUploadedImage(null);
            setPostData({ title: '', body: '' });
            onClose();
        } catch (error) {
            console.error('Error creating post: ', error);
        }

    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow flex flex-col w-1/2">
                <div className="border-b flex flex-row justify-between px-5 py-3">
                    <button type="button" onClick={onClose} className="text-lg font-medium align-middle text-gray-800">Back</button>
                    <h2 className="text-lg font-medium align-middle text-gray-800">Create New Post</h2>
                    <button type="submit" className="text-lg font-medium align-middle text-blue-500 ">Share</button>
                </div>
                <div className="flex flex-row ">
                    <div className="w-1/2" {...getRootProps()}>
                        <input {...getInputProps()} /> 
                            {uploadedImage ? <img src={uploadedImage}/> :
                            <img src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"/>}
                    </div>
                    <div className="px-3 py-4 w-1/2 flex flex-col gap-5">
                        <div className="flex flex-row gap-2">
                            <img className="rounded-full w-8" src="https://i1.sndcdn.com/avatars-Why2guyttlTy7IKw-P2j7wA-t240x240.jpg"/>
                            <p className="font-medium my-auto text-gray-800">Profile img here</p>
                        </div>
                        <input name="title" value={postData.title} onChange={handlePostChange} className="w-full border-none outline-none" placeholder="Title"/>
                        <textarea name="body" value={postData.body} onChange={handlePostChange} className="w-full border-none outline-none resize-none h-40" placeholder="Put some more info here"/>
                    </div>
                </div>
            </form>
        </div>
    );
}
