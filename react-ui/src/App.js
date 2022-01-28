import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import { EditorPage, AdminHome as Admin, SignIn } from "./Pages/Admin";
import { Loading, Header, Footer } from "./components/Client";
import { Contact, Home, About, PreBuiltBlog } from "./Pages/Client";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";

const theme = createTheme();

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState("/posts");
  let [Posts, setPosts] = useState(undefined);
  let [token, setToken] = useState(undefined);
  let [featuredPosts, setFeaturedPosts] = useState(undefined);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(url);
      console.log(res);
      if (res.data !== undefined) {
        await setPosts(res.data);
        await setFeaturedPosts([res.data[0],res.data[2]])

        setIsFetching(false);
        
        return;
      }
    } catch (error) {
      // handle error
      console.log(error);
      return setIsFetching(false);
    }
  }, [url]);

  const readCookie = useCallback(async () => {
    try {
      const res = await axios.get("/read-cookie");

      if (res.data.token !== undefined) {
        await setToken(res.data.token);
      }
    } catch (e) {
      await setToken(undefined);
      console.log(e);
    }
  }, []);

  useEffect(() => {
    readCookie();
  }, [readCookie]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return rest.token !== undefined ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/SignIn",
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }

  const deleteCookie = async () => {
    try {
      await axios.get("/clear-cookie");
      setToken(undefined);
    } catch (e) {
      console.log(e);
    }
  };
  setTimeout(() => {
    console.log(isFetching);
  }, 10000);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <BrowserRouter>
              <Router className="App">
                <Switch>
                  <Redirect from="/home" to="/" />
                  <Route
                    path="/"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header deleteCookie={deleteCookie} token={token} />
                          <h1>Home</h1>

                          <section className="Main">
                            <div>
                              {/*  */}
                              {process.env.NODE_ENV === "production" ? (
                                <p>
                                  This is a production build from
                                  create-react-app.
                                </p>
                              ) : (
                                <p>
                                  Edit <code>src/App.js</code> and save to
                                  reload.
                                </p>
                              )}
                              {/*  */}
                            </div>
                          </section>
                          <Home
                            Posts={Posts}
                            CircularProgress={CircularProgress}
                            isFetching={isFetching}
                          />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                  <Route
                    path="/About"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header deleteCookie={deleteCookie} token={token} />
                          <h1>About</h1>
                          <About
                            CircularProgress={CircularProgress}
                            isFetching={isFetching}
                          />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                  <Route
                    path="/Blog"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header
                            Title="Blog"
                            deleteCookie={deleteCookie}
                            token={token}
                          />
                          <PreBuiltBlog
                            Posts={Posts}
                            CircularProgress={CircularProgress}
                            isFetching={isFetching}
                            featuredPosts={featuredPosts}
                          />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                  <Route
                    path="/Contact"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header deleteCookie={deleteCookie} token={token} />
                          <h1>Contact</h1>
                          <Contact />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                  <PrivateRoute path="/admin" token={token}>
                    <Route
                      path="/admin"
                      exact
                      render={(props) => {
                        //
                        return (
                          <section>
                            <Header deleteCookie={deleteCookie} token={token} />
                            <h1>admin</h1>
                            <Admin />
                            <Footer />
                          </section>
                        );
                      }}
                    />
                  </PrivateRoute>
                  <Route
                    path="/SignIn"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header deleteCookie={deleteCookie} token={token} />
                          <h1>SignIn</h1>
                          <SignIn setToken={setToken} />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                  <Route
                    path="/Editor"
                    exact
                    render={(props) => {
                      //
                      return (
                        <section>
                          <Header deleteCookie={deleteCookie} token={token} />
                          <h1>Editor</h1>
                          <EditorPage />
                          <Footer />
                        </section>
                      );
                    }}
                  />
                </Switch>
              </Router>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
}

export default App;
