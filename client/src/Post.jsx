import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { userContext } from "./App"


function Post() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const user = useContext(userContext)
    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
            .then(result => {
                setPost(result.data)
                console.log(result.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <h1 className="post_title_h1">{post.title}</h1>
            <div className="post_container">
                <img src={`http://localhost:3001/images/${post.file}`} alt="" />
                <p className="post-description">{post.description}</p>
                <p className="post-email">By <b>{post.username}</b></p>
            </div>
        </div>
    )
}

export default Post