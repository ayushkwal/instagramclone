
import React, { useState, useEffect } from 'react'
import { useHistory,Link } from 'react-router-dom'
import Home from './Home'
export default function EditProfile(req, res) {



    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submit, setSubmit] = useState(false)
    const [result, setResult] = useState('')
    const [image, setImage] = useState("")
    const [imageLink, setImageLink] = useState('');
    const [imageStatus, setImageStatus] = useState('Upload Now')
    const history = useHistory();


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


    useEffect(()=>{
    const submitData = async(event)=>{
        if (confirmPassword != password) {
            setResult('Confirm New Password');
            console.log('ss')
            setSubmit(false);
            return;
        }
        if (imageStatus=='Uploading...') {
            setResult('Image is Uploading...');
            console.log('ss')
            setSubmit(false)
            return;
        }
        else {

            if (submit) {
                fetch('/editprofile', ({
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ name, bio, dob, email, phone, oldPassword, password, userId: localStorage.getItem("userId"), profileimage: imageLink })
                })
                ).then((res)=>{
                    return res.json();
                }).then((data)=>{
                    if(data.status)
                    {
                        setResult(data.status)
                    }
                    else{
                        setResult('Error Occured')
                    }
                })
               
            }

        }
    }
    submitData()
    setSubmit(false)
},[submit])

const home=()=>{
    history.push('/login')
}

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
            <div id="editprofile">

                <form>
                    <div id="choosefile" onClick={() => { document.getElementById("fileselect").click() }}>
                        <input style={{ height: 0, width: 0 }} id="fileselect" type="file" name="image"
                            // value={image}
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <svg style={{ border: 1, borderRadius: 100 / 2, borderColor: 'gray' }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="100" height="100" viewBox="0 0 24 24" stroke-width="0.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <p >Your profile picture will let your friends and relatives know...</p>
                        <p style={{ color: 'gray' }}>{imageStatus}</p>
                    </div>
                    <h4>Name</h4>
                    <input type="text" placeholder="e.g. John Doe" onChange={(e) => setName(e.target.value)} />
                    <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>

                    <h4>Bio</h4>
                    <input type="text" placeholder="e.g. Enjoying my life" onChange={(e) => setBio(e.target.value)} />
                    <p>Help people discover your nature by your Bio. You can also call it as status or your summary.</p>
                    <h4>Born On</h4>
                    <input type="date" placeholder="e.g. John Doe" onChange={(e) => setDob(e.target.value)} />
                    <h4>Email</h4>
                    <input type="email" placeholder="e.g. Doe@google.com" onChange={(e) => setEmail(e.target.value)} />
                    <h4>Phone Number</h4>
                    <input type="number" placeholder="e.g. 9784978384" onChange={(e) => setPhone(e.target.value)} />
                    <h4>Change Password</h4>
                    <input type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                    <p>In order to change your password, you need to enter your old password so as to make <strong>Instagram</strong> sure that you are owner</p>
                    <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className="form-btn" onClick={()=>{setSubmit(true)}}>Submit</button>
                    <button className="form-btn-2"><Link style={{color:'white'}} to="/">Home</Link></button>
                    <div id="status" style={{ color: 'red' }}>{result}</div>
                </form>
            </div>
        </div>
    )
}