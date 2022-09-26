import { Routes, Route, Navigate } from "react-router-dom";
import PostData from "../component/posts/post";
import CommentData from "../component/comment/comment";

const RoutesCom = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostData />} />
        <Route path="/comments" element={<CommentData />} />
        <Route path="/comments/postId/:id" element={<CommentData />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </>
  );
};

export default RoutesCom;
