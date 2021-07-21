
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function CreatePost() {

    const history = useHistory();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [name,setName] = useState("")
    const [postresult,setPostresult] = useState('Send your post')

   


    //In order to upload a file,we use new formData()
    // const data = new FormData();
    // data.append("file",image);
    // data.append("upload-preset","")
    // data.append("cloud_name","ayushkhan123")
    const sendPost=async(e)=>{
        const userid = localStorage.getItem("userId")
        const userData = localStorage.getItem("userName");
        setName(userData)
        console.log(name);

        e.preventDefault()
        const res =await fetch('http://localhost:3000/createpost',({
            method:"post",
            body:JSON.stringify({title:title,user:userid,description:description,userName:userData}),
            headers:{
                'Content-type':'application/json'
              },
        }));
        const out = await res.json();
        console.log(out,out.user);
        if(out.user)
        {
            setPostresult('Posted Successfully')
            setTimeout(() => {
                history.push('/')
            }, 4000);
        }
        else{
            setPostresult('You need to login again')
            // post not send 
            
        }
    }

    return (
        <div>
            <h1>{postresult}</h1>
            <form>
            <input type="file" name="image"
            value={image}
            onChange={(e)=>setImage(e.target.files[0])}
            />

            <input type="text" name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            
            />

            <input type="text" name="description"
                value={description}
                onChange={(e)=>setTitle(e.target.value)}
            
            />

            <button onClick={sendPost}>Submit</button>
            </form>
        </div>
    )
}
