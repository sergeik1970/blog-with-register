import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { userContext } from "./App"

const apiUrl = import.meta.env.VITE_API_URL;


function Post() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const user = useContext(userContext)

    const handleDelete = (e) => {
        if (window.confirm('Вы действительно хотите удалить пост?')) {
            axios.delete(`${apiUrl}/deletepostbyid/${id}`)
                .then(res => {
                    navigate("/");
                    console.log(res)

                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/getpostbyid/${id}`)
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
            <img src={`${apiUrl}/images/${post.file}`} alt="post" />
                {/* <img src={`http://localhost:3001/images/${post.file}`} alt="" /> */}
                <p className="post-description">{post.description}</p>
                <p className="post-email">By <b>{post.username}</b></p>
                {
                    user.email === post.email ?
                        <div className="buttons">
                            <button onClick={handleDelete}>Удалить</button>
                            <button><Link to={`/editpostbyid/${post._id}`} className='link'>Редактировать</Link></button>
                        </div>
                        : null
                }

            </div>
        </div>
    )
}

export default Post