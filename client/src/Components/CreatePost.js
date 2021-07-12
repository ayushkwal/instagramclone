import { set } from 'mongoose'
import React,{useState} from 'react'

export default function CreatePost() {


    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")


    //In order to upload a file,we use new formData()
    const data = new FormData();
    data.append('')

    const sendPost=async(e)=>{
        const data =await fetch('localhost:3000/')


    }

    return (
        <div>
            <form>
            <input type="file" name="image"
            value={image}
            onChange={(e)=>setImage(e.target.files[0])}
            />

            <input type="text" name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            
            />
            <button onClick={sendPost}>Submit</button>
            </form>
        </div>
    )
}
