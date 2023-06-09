import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import './Single.scss';

const Single = () => {

   // Setting up initial state for photo, comments, and comment
  const [photo, setPhoto] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  // Getting the location and navigate function from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting photoId from the url path
  const photoId = location.pathname.split("/")[2];

  // Getting the current user from the authContext
  const { currentUser } = useContext(AuthContext);

  // Fetching the photo and comments on mount or whenever there is a change in photoId or comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPhoto = await axios.get(`/photos/${photoId}`);
        setPhoto(resPhoto.data);
        const resCmnt = await axios.get(`/comments`);
        setComments(resCmnt.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [photoId, comments]);

   // Deleting the photo with the given photoId
  const handleDeletePhoto = async () => {
    try {
      await axios.delete(`/photos/${photoId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //WITH THIS FUNCTION I HAVE TRIED TO DELETE A COMMENT, BUT IT DOES NOT WORK
  // const handleDeleteComment = async (comment) => {
  //   try {
  //     await axios.delete(`/users/${comment.id}`);
  //     setUsers(comments.filter((c) => c.id !== comment.id)); // remove the deleted comment from the state
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Adding a comment to the given photoId
  const handleClickCmnt = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comments`, {
        comment, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), pid: photoId
      });
    } catch (err) {
      console.log(err);
    }
    setComment('');
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${photo?.img}`} />
        <div className="user">
          <div className="info">
            <h2>{`Title: ${photo.title}`}</h2>
            <span>{`Username: ${photo.username}`}</span>
            <p>Photo posted {moment(photo.date).fromNow()}</p>
          </div>
          {
            currentUser &&
            (currentUser.username === photo.username && (
              <div >
                <Link to={`/publish?edit=2`} state={photo}>
                  <button className="link">EDIT</button>
                </Link>
                <button className="delete" onClick={handleDeletePhoto}>DELETE</button>
              </div>
            ))
          }
          {
            currentUser &&
          <div className="add-cmnt">
            <label htmlFor="cmnt">Add a comment:</label>
            <textarea id="cmnt" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <button onClick={handleClickCmnt}>ADD</button>
          </div>
          }
        </div>
        <div className="comments">
          {comments.map((cmnt) =>
            cmnt.pid === photo.id && (
              <div key={cmnt.id}>
                <div className="indCmnt">
                  <p>{cmnt.comment}</p>
                  <p>Comment posted {moment(comment.date).fromNow()}</p>
                </div>
                {/* THIS ARE THE EDIT AND DELETE BUTTON, BUT THEY DOES  */}
                  {/* {
            currentUser &&
            (currentUser.username === photo.username && (
              <div >
                <Link to={`/publish?edit=2`} state={photo}>
                  <button className="edit">EDIT</button>
                </Link>
                <button className="delete" onClick={handleDeleteComment}>DELETE</button>
              </div>
            ))
          } */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Single;
