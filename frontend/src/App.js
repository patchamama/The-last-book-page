import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import CommentCreateForm from "./pages/comments/CommentCreateForm";
import CommentPage from "./pages/comments/CommentPage";
import CommentsPage from "./pages/comments/CommentsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import CommentEditForm from "./pages/comments/CommentEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import BooksPage from "./pages/books/BooksPage";
import BookPage from "./pages/books/BookPage";
import BookEditForm from "./pages/books/BookEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      {currentUser ? <SideNavBar /> : null}

      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <CommentsPage message="No results found!" />}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <CommentsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <CommentsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
              />
            )}
          />
          <Route
            exact
            path="/comments/book/:id"
            render={() => (
              <CommentsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`book=`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/comments/create"
            render={() => <CommentCreateForm />}
          />
          <Route
            exact
            path="/comments/:id/create"
            render={() => <CommentCreateForm />}
          />
          <Route exact path="/comments/:id" render={() => <CommentPage />} />
          <Route
            exact
            path="/comments/:id/edit"
            render={() => <CommentEditForm />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/books"
            message="No results found. Adjust the search keyword or add a new book."
            render={() => <BooksPage />}
          />
          <Route exact path="/books/:id/edit" render={() => <BookEditForm />} />
          <Route
            exact
            path="/books/create/:newtitle"
            render={() => <BookEditForm />}
          />
          <Route exact path="/books/create" render={() => <BookEditForm />} />
          <Route exact path="/books/:id" render={() => <BookPage />} />
          <Route
            exact
            path="/bookmarks"
            render={() => (
              <BooksPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`bookmark__owner__profile=${profile_id}`}
              />
            )}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
