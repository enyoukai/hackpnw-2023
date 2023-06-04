import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

import AddressAutocomplete from './AddressAutocomplete'

export function CreatePostPopup({ onClose }) {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        longitude: 0,
        latitude: 0,
        addressName: ''
    });  

    const handlePlaceSelected = (place) => {
        console.log(place);
        const longitude = place.geometry.location.lng();
        const latitude = place.geometry.location.lat();
        const address = place.name;

        setPostData((prevData) => ({...prevData, longitude: longitude, latitude: latitude, addressName: address}))
    }
    const onDrop = useCallback(acceptedFiles => {
        setUploadedImage((acceptedFiles[0]))}
    , []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	const handlePostChange = (e) => {
		const { name, value } = e.target;
		setPostData((prevData) => ({ ...prevData, [name]: value }));

	};

    async function handleSubmit(event)
    {
        event.preventDefault();
        const data = new FormData();

        data.append('image', uploadedImage);
        for (const [key, value] of Object.entries(postData)) {
            data.append(key, value);
        }

        try {

            const response = await axios.post('/posts', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadedImage(null);
            setPostData({ title: '', body: '' });
            onClose();
        } catch (error) {
            console.error('Error creating post: ', error);
        }

    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-[#DDEAD1] rounded-lg shadow flex flex-col w-1/2">
                <div className="border-b bg-[#C7DDB5] rounded-t-lg flex flex-row justify-between px-5 py-3">
                    <button type="button" onClick={onClose} className="text-lg font-medium align-middle text-gray-800">Back</button>
                    <h2 className="text-lg font-medium align-middle text-gray-800">Create New Post</h2>
                    <button type="submit" className="text-lg font-medium align-middle text-[#75975E] ">Share</button>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/2" {...getRootProps()}>
                        <input {...getInputProps()} /> 
                            {uploadedImage ? <img src={URL.createObjectURL(uploadedImage)}/> :
                            <img src="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"/>}
                    </div>
                    <div className="px-3 py-4 w-1/2 flex flex-col gap-5">
                        <div className="flex flex-row gap-2">
                            <img className="rounded-full w-8" src="https://i1.sndcdn.com/avatars-Why2guyttlTy7IKw-P2j7wA-t240x240.jpg"/>
                            <p className="font-medium my-auto text-gray-800">Profile img here</p>
                        </div>
                        <input name="title" value={postData.title} onChange={handlePostChange} className="w-full bg-[#DDEAD1] border-none outline-none" placeholder="Title"/>
                        <textarea name="body" value={postData.body} onChange={handlePostChange} className="w-full bg-[#DDEAD1] border-none outline-none resize-none h-40" placeholder="Put some more info here"/>
                        <AddressAutocomplete onPlaceSelected={handlePlaceSelected}/>
                    </div>
                </div>
            </form>
        </div>
    );
}
