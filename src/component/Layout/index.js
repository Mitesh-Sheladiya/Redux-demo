import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import RoutesCom from "../../routes";
import PublicRoutes from "../../publicRoutes";
import { searchItem } from "../../store/action";
import { getCommitData, getPostData } from "../../store/action";

const drawerWidth = 240;

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [path, setPath] = React.useState("");

  const email = sessionStorage.getItem("user");

  useEffect(() => {
    const pathname = window.location.pathname;
    setPath(pathname);
  }, [window.location.pathname]); // eslint-disable-line

  const handleSearch = (value) => {
    if (value !== "") {
      dispatch(searchItem(value));
    } else {
      dispatch(getPostData());
      dispatch(getCommitData());
    }
  };

  const handleLogOut = () => {
    navigate("/login");
    sessionStorage.clear("user");
  };

  return window.location.pathname === "/login" ? (
    <PublicRoutes />
  ) : (
    <div className="table-wrapper">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {path === "/posts" ? "Post" : "Comment"}
            </Typography>{" "}
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div>{email}</div>
              <div>
                <AccountCircleIcon
                  style={{ marginLeft: "10px", fontSize: "40px" }}
                />
              </div>
              <div style={{ marginLeft: "35px" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleLogOut()}
                >
                  Log out
                </Button>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <NavLink
              to="/posts"
              style={{ textDecoration: "none", marginLeft: "50px" }}
            >
              <Button
                style={{
                  background: "#1976d2",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
              >
                post
              </Button>
            </NavLink>
          </List>

          <List>
            <NavLink
              to="/comments"
              style={{ textDecoration: "none", marginLeft: "50px" }}
            >
              <Button
                variant="outlined"
                style={{
                  background: "#1976d2",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
              >
                Comment
              </Button>
            </NavLink>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 350,
              marginBottom: "30px",
              float: "right",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <RoutesCom />
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
