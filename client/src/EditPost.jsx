import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { userContext } from "./App"

function EditPost() {
    const { id } = useParams()
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const user = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault(e);

        axios.put("http://localhost:3001/editpostbyid/" + id, {title, description})
            .then(res => {
                if (res.data === "Success") {
                    window.location.href = "/post/" + id;
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:3001/getpostbyid/" + id)
            .then(res => {
                setTitle(res.data.title)
                setDescription(res.data.description)
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <div className="post_container">
            <div className="post_form">
                <form className="post-form" onSubmit={handleSubmit}>
                    <h2>Редактировать пост</h2>
                    <input type="text" placeholder="Заголовок..." value={title} onChange={e => setTitle(e.target.value)} />

                    <textarea name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Описание..." value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    {/* <input type="file" className="file" placeholder="Select File"
                        onChange={e => setFile(e.target.files[0])} /> */}
                    <button>Применить изменения</button>
                </form>
            </div>
        </div>

    )
}

export default EditPost