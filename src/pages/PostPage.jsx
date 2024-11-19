import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";

const PostPage = () => {
  const { id: postId } = useParams(); // Get post ID from URL params
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editedData, setEditedData] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
        setEditedData({ title: data.title, description: data.description });
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpvote = async () => {
    if (!post) return;

    const { data, error } = await supabase
      .from("questions")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", postId);

    if (error) {
      console.error("Error updating upvotes:", error);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 });
    }
  };

  const handleEdit = async () => {
    const { data, error } = await supabase
      .from("questions")
      .update(editedData)
      .eq("id", postId);

    if (error) {
      console.error("Error updating post:", error);
    } else {
      setPost({ ...post, ...editedData });
      setIsEditing(false); // Exit edit mode
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("questions")
      .delete()
      .eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
    } else {
      alert("Post deleted!");
      navigate("/feed"); // Redirect to feed after deletion
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) =>
              setEditedData({ ...editedData, title: e.target.value })
            }
            placeholder="Edit title"
          />
          <textarea
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
            placeholder="Edit description"
          />
          <button onClick={handleEdit}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <button onClick={handleUpvote}>Upvote ({post.upvotes})</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostPage;
