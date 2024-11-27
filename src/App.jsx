import { useState, useEffect } from "react";
import { registerAPI, loginAPI, verifyToken } from "./API/auth";
import Navbar from "./components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PostCard from "./components/postcard";

function App() {
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('user') || '');
  const [refreshpostdata, setRefreshPostData] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token,refreshpostdata]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/users/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 404) {
          throw new Error('Resource not found (404)');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("content", newPostContent);
    if (newPostImage) formData.append("media", newPostImage);

  
      const response = await fetch("http://localhost:8000/api/posts", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setPosts([data, ...posts]);
      setNewPostContent("");
      setNewPostImage(null);
    }
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setNewImage(URL.createObjectURL(file));
    
        const formData = new FormData();
        formData.append("image", file);
    
        fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const imageUrl = data.url;
            const newPost = {
              content: newPostContent,
              image: imageUrl,
              userId: user.id,
              timestamp: new Date().toISOString(),
            };
            fetch("/api/create-post", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newPost),
            }).then((response) => {
              if (response.ok) {
                setNewPostContent("");
                setNewImage(null);
                refreshPostData();
              }
            });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      }
    };
    

  return (
    <main className="w-screen h-screen bg-black/80 flex flex-col gap-3 overflow-y-auto">
  <Navbar />
  <div className="flex flex-col bg-black/60">
    {/* New Post Section */}
    <div className="flex flex-col sm:flex-row gap-2 items-center p-2 bg-black/80 border-b py-5 border-gray-300">
      <div className="flex gap-3 items-center text-white">
      <img
        src={newImage || user?.avatar || "https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => document.getElementById('imageUpload').click()}
      />
      <input
        type="file"
        id="imageUpload"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
        <div className="flex flex-col">
          <p>{user?.username}</p>
          <p className="text-xs text-gray-400">
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
      <Input
        className="rounded-xl bg-gray-300 w-full sm:w-auto"
        placeholder="What's on your mind?"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setNewPostImage(e.target.files[0])}
        className="text-white bg-gray-800 w-full sm:w-auto"
      />
      <Button onClick={handleCreatePost}>Post</Button>
    </div>
  </div>

  {/* Display Posts Section */}
  <section className="flex flex-col sm:flex-row gap-2 w-full overflow-x min-w-0">
    <div className="w-full overflow-x-auto flex flex-col sm:flex-row gap-2">
      {/* Post Cards */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} refreshpostdata={refreshpostdata} setRefreshPostData={setRefreshPostData} />
      ))}
    </div>
  </section>
</main>

  );
}

export default App;
