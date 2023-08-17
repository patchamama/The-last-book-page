// React / router
import { Route, Switch } from "react-router-dom";
// Components
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
// React Bootstrap components
import Container from "react-bootstrap/Container";
// API
import "./api/axiosDefaults";
// Context
import { useCurrentUser } from "./contexts/CurrentUserContext";
// Auth pages
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
// Comments pages
import CommentCreateForm from "./pages/comments/CommentCreateForm";
import CommentPage from "./pages/comments/CommentPage";
import CommentsPage from "./pages/comments/CommentsPage";
import CommentEditForm from "./pages/comments/CommentEditForm";
// Profiles pages
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
// Books pages
import BooksPage from "./pages/books/BooksPage";
import BookPage from "./pages/books/BookPage";
import BookEditForm from "./pages/books/BookEditForm";
// Bookmarks pages
import BookmarkPage from "./pages/bookmarks/BookmarkPage";
// Styles
import styles from "./App.module.css";
// 404 page
import PageNotFound from "./components/PageNotFound";
// Notifications
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  // getting the current user from the CurrentUserContext
  const currentUser = useCurrentUser();
  // getting the profile ID of the current user or setting it to an empty string if there's no user
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      {/* Rendering the NavigationBar component */}
      <NavBar />
      {/* Rendering the SideNavigationBar component if there's a current user */}
      {currentUser ? <SideNavBar /> : null}

      <Container className={styles.Main}>
        {/* Rendering the NotificationContainer component */}
        <NotificationContainer />
        {/* Defining the routes using Switch and Route components */}
        <Switch>
          {/* Defining the route for the home page */}
          <Route
            exact
            path="/"
            render={() => <CommentsPage message="No results found!" />}
          />
          {/* Defining the route for the user's feed */}
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
          {/* Defining the route for the user's liked comments */}
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
          {/* Defining the route for the comments for a id book */}
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
          {/* Defining the route to create a comment */}
          <Route
            exact
            path="/comments/:id/create"
            render={() => <CommentCreateForm />}
          />
          {/* Defining the route for view a comment id */}
          <Route exact path="/comments/:id" render={() => <CommentPage />} />
          <Route
            exact
            path="/comments/:id/edit"
            render={() => <CommentEditForm />}
          />
          {/* Defining the routes for the profiles pages */}
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
          {/* Defining the routes for the books pages */}
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
          {/* Defining the routes for the bookmarks pages */}
          <Route exact path="/bookmarks/:id" render={() => <BookmarkPage />} />
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
          {/* Defining the route for the 404 page */}
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
