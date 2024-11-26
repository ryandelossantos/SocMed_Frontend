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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/posts/', {
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
      fetchPosts();
      fetchUser();
    }
  }, [token]);

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("content", newPostContent);
    if (newPostImage) formData.append("media", newPostImage);

  
      const response = await fetch("http://localhost:8000/api/posts/", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Do not set 'Content-Type' here
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
  

  return (
    <main className="w-screen h-screen bg-black/80 flex flex-col gap-3 overflow-y-auto">
      <Navbar />
      <div className="flex flex-col bg-black/60">
        {/* New Post Section */}
        <div className="flex gap-2 items-center p-2 bg-black/80 border-b py-5 border-gray-300">
          <div className="flex gap-3 items-center text-white">
            <img
              src={user?.profile_image || "https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p>{user?.username}</p>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
          <Input
            className="rounded-xl bg-gray-300"
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setNewPostImage(e.target.files[0])}
            className="text-white bg-gray-800"
          />
          <Button onClick={handleCreatePost}>Post</Button>
        </div>
      </div>

      {/* Display Posts Section */}
      <section className="flex gap-2 w-full overflow-x min-w-0">
        <div className="w-full overflow-x-auto flex gap-2">
          {/* Post Cards */}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
