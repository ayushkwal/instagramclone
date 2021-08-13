
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";


export default function CreatePost() {

    const history = useHistory();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [postresult, setPostresult] = useState('Send your post')
    const [imageLink, setImageLink] = useState('');
    const [imageStatus, setImageStatus] = useState('Upload Now')




    //In order to upload a file,we use new formData()
    useEffect(() => {
        if (image == '') {
            return;
        }
        setImageStatus('Uploading...')
        console.log(image, 'is image')
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagramdata")
        data.append("cloud_name", "ayushkhan123")
        fetch('	https://api.cloudinary.com/v1_1/ayushkhan123/image/upload', {
            method: 'post',
            body: data
        }).then(res => res.json()).then((a) => {
            setImageLink(a.secure_url);
            setImageStatus('Uploaded')
        })
    }, [image])



    const sendPost = async (e) => {
        const userid = localStorage.getItem("userId")
        const userData = localStorage.getItem("userName");
        setName(userData)
        console.log(name);

        e.preventDefault()
        const res = await fetch('/createpost', ({
            method: "post",
            body: JSON.stringify({ title: title, user: userid, description: description, userName: userData, imageLink }),
            headers: {
                'Content-type': 'application/json'
            },
        }));
        const out = await res.json();
        console.log(out, out.user);
        if (out.user) {
            setPostresult('Posted Successfully')
            setTimeout(() => {
                history.push('/')
            }, 4000);
        }
        else {
            setPostresult('You need to login again')
            // post not send 

        }
    }

    return (
        <div id="createpostmaincontainer">
            <div id="createpostcontainer">
                <div id="choosefile" onClick={() => { document.getElementById("fileselect").click() }}>
                    <input style={{ height: 0, width: 0 }} id="fileselect" type="file" name="image"
                        // value={image}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#0077b5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <p >Add your image file</p>
                    <p>Your image must be small size, landscape or portrait, an img file but should be less in size</p>
                    <p style={{ color: 'gray' }}>{imageStatus}</p>
                </div>
                <div id="createpostdata">
                    <p style={{ fontSize: 32 }}>Add a new Post</p>
                    <h4 style={{ fontSize: 18 }} >Details:</h4>
                    <input type="text" name="title" placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />

                    <input type="text" name="description" placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />

                    <button id="uploadbtn" onClick={sendPost}>Submit</button>

                    <h4></h4>
                </div>
            </div>
        </div>
    )
}
