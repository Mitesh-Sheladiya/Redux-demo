import Layout from "./component/Layout";
import PublicRoutes from "./publicRoutes";

const App = () => {
  const user = localStorage.getItem("user");

  return <>{user ? <Layout /> : <PublicRoutes />}</>;
};

export default App;
