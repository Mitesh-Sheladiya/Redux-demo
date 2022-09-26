import Layout from "./component/Layout";
import PublicRoutes from "./publicRoutes";

const App = () => {
  const user = sessionStorage.getItem("user");

  return <>{user ? <Layout /> : <PublicRoutes />}</>;
};

export default App;
