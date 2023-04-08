import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const PublishPhoto = () => {

    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate()

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/upload', formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state ? await axios.put(`/photos/${state.id}`, {
                title, cat, img: file ? imgUrl : ''
            }) : await axios.post(`/photos/`, {
                title, cat, img: file ? imgUrl : '', date: moment(Date.now()).format('YYYY-MM-DD HH:MM:SS')
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "sport"}
                            name="cat"
                            value="sport"
                            id="sport"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="sport">Sport</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "art"}
                            name="cat"
                            value="art"
                            id="art"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "technology"}
                            name="cat"
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "cinema"}
                            name="cat"
                            value="cinema"
                            id="cinema"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "food"}
                            name="cat"
                            value="food"
                            id="food"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                    <button onClick={handleClick} className="publish">Publish</button>
                </div>
                {/* {
                    file && <img src={`${file.name}`} alt="" />
                } */}
            </div>
        </div>
    )
}

export default PublishPhoto
