import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get(`${apiUrl}/getposts`)
            .then(posts => {
                setPosts(posts.data)
                console.log(posts)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="posts_container">
            {/* <h1>Главная</h1> */}
            {
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`} className="post">
                        <div className="post-item">
                            <img src={`${apiUrl}/images/${post.file}`} alt="" />
                            <div className="post_text">
                                <h2>{post.title}</h2>
                                <p className="post-item-email">Автор: <b>{post.username}</b></p>
                                <p className="post-text">{post.description}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Home;