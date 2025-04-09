import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    axios.get(`${apiUrl}/getposts?page=${page}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          if (res.data.length === 0) {
            setHasMore(false); // больше нечего грузить
          } else {
            setPosts(prev => {
                const existingIds = new Set(prev.map(p => p._id));
                const newPosts = res.data.filter(post => !existingIds.has(post._id));
                return [...prev, ...newPosts];
              });
            setPage(prev => prev + 1);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts(); // первая загрузка
  }, []);

  return (
    <div className="posts_container">
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

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={fetchPosts} disabled={loading}>
            {loading ? "Загрузка..." : "Показать ещё"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

// import axios from "axios"
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"

// const apiUrl = import.meta.env.VITE_API_URL;

// function Home() {
//     const [posts, setPosts] = useState([]);
//     const [showNotice, setShowNotice] = useState(true);
  
//     useEffect(() => {
//       // Скрыть уведомление через 10 секунд
//       const timeout = setTimeout(() => setShowNotice(false), 50000);
  
//       axios.get(`${apiUrl}/getposts`)
//         .then(res => {
//           console.log("Ответ от сервера:", res.data);
//           if (Array.isArray(res.data)) {
//             setPosts(res.data);
//           } else {
//             console.error("Ожидался массив, но пришло что-то другое:", res.data);
//             setPosts([]);
//           }
//         })
//         .catch(err => console.log(err));
  
//       return () => clearTimeout(timeout);
//     }, []);
  
//     return (
//       <div className="posts_container">
//         {showNotice && (
//           <div className="notice">
//             ⚠️ Загрузка постов может занять до 90 секунд из-за особенностей хостинга и активности особо «одарённых» пользователей :)
//           </div>
//         )}
//         {posts.map(post => (
//           <Link key={post._id} to={`/post/${post._id}`} className="post">
//             <div className="post-item">
//               <img src={post.file} alt="" />
//               <div className="post_text">
//                 <h2>{post.title}</h2>
//                 <p className="post-item-email">Автор: <b>{post.username}</b></p>
//                 <p className="post-text">{post.description}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     );
//   }
  
//   export default Home;