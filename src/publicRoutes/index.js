import { Routes, Route } from "react-router-dom";
import Login from "../component/login/login";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
