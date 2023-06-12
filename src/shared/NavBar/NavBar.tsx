import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  Tooltip,
  Fade,
  IconButton,
  Badge,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Cart } from "../Cart/Cart";

export const NavBar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(true);
  const [open, setOpen] = useState(false);
  const items = useAppSelector((state) => state.cartReducer);

  const handleStateViewDrawer = () => {
    setOpen((state) => !state);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Stack direction="row" spacing={7}>
                  <Typography variant="h6" color="primary">
                    React-App-Openix IT
                  </Typography>
                  {isLogged ? (
                    <>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="Add"
                      >
                        <Button
                          onClick={() => {
                            navigate("/to-do-list");
                          }}
                        >
                          <Typography variant="h6" color="white">
                            To Do List
                          </Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="Add"
                      >
                        <Button
                          onClick={() => {
                            navigate("/rick-morty-list");
                          }}
                        >
                          <Typography variant="h6" color="white">
                            Rick & Morty List
                          </Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                        title="Add"
                      >
                        <Button
                          onClick={() => {
                            navigate("/admin-post-user");
                          }}
                        >
                          <Typography variant="h6" color="white">
                            Admin of Posts and User
                          </Typography>
                        </Button>
                      </Tooltip>
                      <IconButton
                        color="primary"
                        onClick={handleStateViewDrawer}
                      >
                        <Badge color="error" badgeContent={items.length}>
                          <ShoppingCartOutlined />
                        </Badge>
                      </IconButton>
                    </>
                  ) : (
                    <div></div>
                  )}
                </Stack>
              </Grid>
              {isLogged ? (
                <div></div>
              ) : (
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Register
                    </Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Cart open={open} handleStateViewDrawer={handleStateViewDrawer} />
    </Box>
  );
};
