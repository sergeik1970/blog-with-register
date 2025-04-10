// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const apiUrl = import.meta.env.VITE_API_URL;

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const fetchPosts = () => {
//     setLoading(true);
//     axios.get(`${apiUrl}/getposts?page=${page}`)
//       .then(res => {
//         if (Array.isArray(res.data)) {
//           if (res.data.length === 0) {
//             setHasMore(false); // больше нечего грузить
//           } else {
//             setPosts(prev => {
//                 const existingIds = new Set(prev.map(p => p._id));
//                 const newPosts = res.data.filter(post => !existingIds.has(post._id));
//                 return [...prev, ...newPosts];
//               });
//             setPage(prev => prev + 1);
//           }
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     alert("⚠️ Внимание: из-за особенностей хостинга и 'одарённых' пользователей, загрузка постов может занять до 90 секунд.");
//     fetchPosts(); // первая загрузка
//   }, []);

//   return (
//     <div className="posts_container">
//       {
//         posts.map(post => (
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
//         ))
//       }

//       {hasMore && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button onClick={fetchPosts} disabled={loading}>
//             {loading ? "Загрузка..." : "Показать ещё"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const apiUrl = import.meta.env.VITE_API_URL;

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [showNotice, setShowNotice] = useState(true);

//   const fetchPosts = () => {
//     if (loading) return;
//     setLoading(true);
    
//     axios.get(`${apiUrl}/getposts?page=${page}`)
//       .then(res => {
//         if (Array.isArray(res.data)) {
//           if (res.data.length === 0) {
//             setHasMore(false);
//           } else {
//             const existingIds = new Set(posts.map(p => p._id));
//             const newPosts = res.data.filter(post => !existingIds.has(post._id));
//             setPosts(prev => [...prev, ...newPosts]);
//             setPage(prev => prev + 1);
//           }
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Ошибка при загрузке постов:", err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => setShowNotice(false), 90000);
//     fetchPosts(); // первая загрузка

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="posts_container">
//       {showNotice && (
//         <div className="notice">
//           ⚠️ <b>Внимание!</b> Загрузка постов может занять до <b>90 секунд</b> из-за особенностей хостинга и активности особо «одарённых» пользователей 🙂
//         </div>
//       )}

//       {posts.map(post => (
//         <Link key={post._id} to={`/post/${post._id}`} className="post">
//           <div className="post-item">
//             <img src={post.file} alt="" />
//             <div className="post_text">
//               <h2>{post.title}</h2>
//               <p className="post-item-email">Автор: <b>{post.username}</b></p>
//               <p className="post-text">{post.description}</p>
//             </div>
//           </div>
//         </Link>
//       ))}

//       {hasMore && (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button onClick={fetchPosts} disabled={loading}>
//             {loading ? "Загрузка..." : "Показать ещё"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  const observer = useRef();

  const lastPostRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchPosts = () => {
    setLoading(true);
    axios.get(`${apiUrl}/getposts?page=${page}`)
      .then(res => {
        if (Array.isArray(res.data)) {
          if (res.data.length === 0) {
            setHasMore(false);
          } else {
            const existingIds = new Set(posts.map(p => p._id));
            const newPosts = res.data.filter(post => !existingIds.has(post._id));
            setPosts(prev => {
              const existingIds = new Set(prev.map(p => p._id)); // все уже загруженные id
              const filteredNew = newPosts.filter(post => !existingIds.has(post._id)); // отфильтровали повторы
              return [...prev, ...filteredNew]; // добавляем только новые
            });
            setPage(prev => prev + 1);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка при загрузке постов:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowNotice(false), 10000);
    fetchPosts(); // первая загрузка
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="posts_container">
      {showNotice && (
        <div className="notice">
          ⚠️ <b>Внимание!</b> Загрузка постов может занять до <b>90 секунд</b> из-за особенностей хостинга и активности особо «одарённых» пользователей 🙂
        </div>
      )}

      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="post">
            <div className="post-item" ref={isLast ? lastPostRef : null}>
              <img src={post.file} alt="" />
              <div className="post_text">
                <h2>{post.title}</h2>
                <p className="post-item-email">Автор: <b>{post.username}</b></p>
                <p className="post-text">{post.description}</p>
              </div>
            </div>
          </Link>
        );
      })}

      {loading && (
        <div style={{ textAlign: "center", margin: "20px", fontWeight: "bold" }}>
          Загрузка...
        </div>
      )}
    </div>
  );
}

export default Home;