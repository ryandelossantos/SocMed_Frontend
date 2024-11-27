import { useState , useEffect} from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Save, X } from "lucide-react";
import { AccessToken } from "../API/auth";
import { baseURL } from "../API";
import { jwtDecode } from "jwt-decode";

export default function PostCard({ post, user ,refreshpostdata, setRefreshPostData}) {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);
  const [newPostImage, setNewPostImage] = useState(null);

  const handleLike = async (postId) => {
    if (AccessToken) {
      console.log('AccessToken:', AccessToken);
      fetch(`${baseURL}/posts/${postId}/like`,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AccessToken}`,
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Post liked:', data);
        setRefreshPostData(!refreshpostdata)
      })
      .catch(error => {
        console.error('Error liking post:', error);
        if (error instanceof SyntaxError) {
          fetch(`${baseURL}/posts/${postId}/like`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${AccessToken}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.text())
          .then(text => console.log('Response text:', text));
        }
      });
    } else {
      console.error('No access token found');
    }
  };
  const handleComment = (postId) =>{
    if(AccessToken){
      fetch(`${baseURL}/posts/${postId}/comment`)
    }
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append("content", newContent);
    if (newPostImage) formData.append("media", newPostImage);

    axios
      .put(`${baseURL}/posts/${post.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setEditing(false);
      })
      .catch((error) => console.error("Error saving post:", error));
  };

  const handleCancel = () => {
    setEditing(false);
    setNewContent(post.content);
  };
  const userinfo = jwtDecode(sessionStorage.getItem('user'))

  return (
    <div className="w-full bg-black/80 py-3 rounded-md">
      <div className="flex items-center justify-between px-3 text-white">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={``|| "https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"} />
            <AvatarFallback>{userinfo.username?.[userinfo.id]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p>{user ?.username}</p>
            <p className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        </div>
        {/* Edit / Save / Cancel Buttons */}
        {user?.id === post.user.id && (
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button onClick={handleSave} className="text-white">
                  <Save />
                </button>
                <button onClick={handleCancel} className="text-white">
                  <X />
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="text-white">
                <Edit />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="p-5 text-gray-200">
        {editing ? (
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="bg-gray-700 p-2 w-full rounded-md"
          />
        ) : (
          <p>{post.content}</p>
        )}
        {post.media && !editing && <img src={`http://localhost:8000${post.media}`} alt="Post media" className="w-full mt-3" />}
      </div>

      {/* Actions (like and comment) */}
      <div className="flex gap-3 mt-3">
        <button onClick={() => handleLike(post.id)} className="text-white">
          👍 {post.likes_count} Likes
        </button>
        <button onClick={() => handleComment(post.id)} className="text-white">💬 {post.comments_count} Comments</button>
      </div>
    </div>
  );
}
