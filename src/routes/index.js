import { Routes, Route } from "react-router-dom";
import PostData from "../component/posts/post";
import CommentData from "../component/comment/comment";

const RoutesCom = () => {
  return (
    <>
      <Routes>
        <Route path="/posts" element={<PostData />} />
        <Route path="/comments" element={<CommentData />} />
        <Route path="/comments?postId=:id" element={<CommentData />} />
      </Routes>
    </>
  );
};

export default RoutesCom;
