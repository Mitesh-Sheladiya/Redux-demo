import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../component/login/login";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
