# Testing

## Manual Testing

The process and outcomes of manual testing are described in depth in the following section:

### _Navigation_

<br>

| Page/Status    | Element               |  Action   |                               Expected Result                               | Pass/Fail |
| -------------- | --------------------- | :-------: | :-------------------------------------------------------------------------: | :-------: |
| **Homepage**   | **Navbar**            |           |                                                                             |           |
|                | _Logo_                |  _click_  |                           _Redirect to homepage_                            | **pass**  |
| **logged out** | _Sign-in link_        |  _click_  |                         _Open `SignInForm.js` page_                         | **pass**  |
|                | _Sign-up link_        |  _click_  |                         _Open `SignUpForm.js` page_                         | **pass**  |
| **logged in**  | _Avatar with Profile_ | _display_ |                     _Display the current users Avatar_                      | **pass**  |
|                |                       |  _hover_  |                       _'Profile' text changes colour_                       | **pass**  |
|                |                       |  _click_  |                     _Go to current users profile page_                      | **pass**  |
|                | _Home link_           |  _click_  |                           _Redirect to homepage_                            | **pass**  |
|                | _Add Comment link_    |  _click_  |                     _Open `CommentCreateForm.js` page_                      | **pass**  |
|                | _Books link_          |  _click_  |             _Display a page with all the books `BooksPage.js`_              | **pass**  |
|                | _Bookmarks link_      |  _click_  | _Display a page of bookmarks which has been bookmarked by the current user_ | **pass**  |
|                | _Feed link_           |  _click_  |             _Display Feed page of comments from followed users_             | **pass**  |
|                | _Liked link_          |  _click_  |          _Display a page of liked comments from the current user_           | **pass**  |
|                | _Sign Out link_       |  _click_  |                     _Sign out and go to the home page_                      | **pass**  |
|                | _All nav headings_    |  _hover_  |                 _Display black text & lighter icon colour_                  | **pass**  |

### _Comment Component_

<br>

| Page/Status                   | Element                    |     Action     |                                                   Expected Result                                                    | Pass/Fail |
| ----------------------------- | -------------------------- | :------------: | :------------------------------------------------------------------------------------------------------------------: | :-------: |
| **Homepage**                  | _Search bar_               | _type keyword_ |                                      _Loading spinner displayed until results_                                       | **pass**  |
|                               |                            |  _no-results_  |                                         _Display no results image with text_                                         | **pass**  |
| **logged-out**                | **Comment Component**      |                |                                                                                                                      |           |
|                               | _Comment header_           |   _display_    |                                     _Comment owner avatar & 'profile' name text_                                     | **pass**  |
|                               |                            |   _display_    |                                                    _Comment date_                                                    | **pass**  |
|                               | _Avatar_                   |    _click_     |                                         _Profile page of the comment owner_                                          | **pass**  |
|                               |                            |    _hover_     |                                       _text changes colour on 'profile' text_                                        | **pass**  |
|                               | _Cover book comment image_ |    _hover_     |                                                   _pointer cursor_                                                   | **pass**  |
|                               |                            |    _click_     |                                            _Redirect to book detail page_                                            | **pass**  |
|                               | _Heart Icon_               |    _hover_     |                                       _Display 'Log in to like comments' text_                                       | **pass**  |
|                               | _Sticker Icon_             |    _hover_     |                                            _Display 'View Stickers' text_                                            | **pass**  |
|                               |                            |    _click_     |                                          _Redirect to stickers detail page_                                          | **pass**  |
| **Comment Detail page/ Home** | **Comments section**       |                |                                                                                                                      |           |
|                               |                            |   _display_    |                                                       _Avatar_                                                       | **pass**  |
|                               |                            |   _display_    |                                                    _Comment date_                                                    | **pass**  |
|                               | _Avatar_                   |    _click_     |                                         _Redirect to comment owners profile_                                         | **pass**  |
| **logged-in**                 | **Comment Component**      |                |                                                                                                                      |           |
|                               | _Heart Icon_               |    _hover_     | _If the currently logged-in user is the owner of the comment display 'Sorry, you can't like your own comments' text_ | **pass**  |
|                               |                            |    _hover_     |             _Display 'Click to like comment' text if the logged in user is not the owner of the Comment_             | **pass**  |
|                               |                            |    _click_     |                                           _Comment saved to 'Liked' list_                                            | **pass**  |
|                               |                            |                |                                       _Success notification - 'Comment liked'_                                       | **pass**  |
|                               | _Solid heart Icon_         |    _click_     |                                         _Comment removed from 'Liked' list_                                          | **pass**  |
|                               |                            |                |                                          _Notification - 'Comment Unliked'_                                          | **pass**  |
|                               | _Sticker Icon_             |    _hover_     |                                              _Display 'View Stickers'_                                               | **pass**  |
|                               |                            |    _click_     |                                   _Redirect to comments details and show stickers_                                   | **pass**  |
| **comment-owner**             | _Edit/Delete menu_         |   _display_    |                         _If the user is the owner of the comment, display edit/delete menu_                          | **pass**  |
|                               |                            |    _hover_     |                                                   _Pointer cursor_                                                   | **pass**  |
|                               | _Edit icon_                |    _hover_     |                                               _Add background colour_                                                | **pass**  |
|                               |                            |    _click_     |                                           _Redirect to comment edit page_                                            | **pass**  |
|                               | _Delete icon_              |    _hover_     |                                               _Add background colour_                                                | **pass**  |
|                               |                            |    _click_     |                                           _Comment removed from database_                                            | **pass**  |
|                               |                            |                |                                          _Notification - 'Comment removed'_                                          | **pass**  |

### _Add/Edit Comment_

<br>

| Page/Status           | Element         |  Action   |                                        Expected Result                                        | Pass/Fail |
| --------------------- | --------------- | :-------: | :-------------------------------------------------------------------------------------------: | :-------: |
| **Add comment page**  |                 |           |                                                                                               |           |
|                       | _Add Comment_   |  _click_  |          _When click on Add Comment of the navbar menu, edit comment form is showed_          | **pass**  |
|                       | _Comment_       | _display_ |                         _Comment must be showed in a textarea field_                          | **pass**  |
|                       | _Cancel button_ |  _hover_  |                            _Change text colour and mouse pointer_                             | **pass**  |
|                       |                 |  _click_  |                                    _Redirect to homepage_                                     | **pass**  |
|                       | _Save button_   |  _hover_  |                            _Change text colour and mouse pointer_                             | **pass**  |
|                       |                 |  _click_  |                        _With valid data - direct to new comment page_                         | **pass**  |
|                       |                 |           |                       _Success notifcation of a newly created Comment_                        | **pass**  |
| **Edit comment page** | _Edit Comment_  |  _click_  | _When click on Popupmenu Edit comment and the user is the owner, edit comment form is showed_ | **pass**  |
|                       | _Comment_       | _display_ |                         _Comment must be showed in a textarea field_                          | **pass**  |
|                       | _Cancel button_ |  _hover_  |                            _Change text colour and mouse pointer_                             | **pass**  |
|                       |                 |  _click_  |                                    _Redirect to homepage_                                     | **pass**  |
|                       | _Save button_   |  _hover_  |                            _Change text colour and mouse pointer_                             | **pass**  |
|                       |                 |  _click_  |                         _With valid data - redirect to comment page_                          | **pass**  |
|                       |                 |           |                            _Success notifcation of saved Comment_                             | **pass**  |

### _Book Component_

<br>

| Page/Status            | Element               |     Action     |                                                       Expected Result                                                        | Pass/Fail |
| ---------------------- | --------------------- | :------------: | :--------------------------------------------------------------------------------------------------------------------------: | :-------: |
| **Homepage**           | _Search bar_          | _type keyword_ |                                          _Loading spinner displayed until results_                                           | **pass**  |
|                        |                       |  _no-results_  |                                             _Display no results image with text_                                             | **pass**  |
|                        |                       |  _no-results_  |                                                 _Display option to add book_                                                 | **pass**  |
| **logged-out**         | **Book Component**    |   _display_    |                                            _Book option in Navbar is not showed_                                             |           |
| **Book Detail page**   | **from home section** |   _display_    |                    _When a cover of a book in the home page is selected, the book detail page is showed_                     |           |
|                        |                       |   _display_    |                                                           _Cover_                                                            | **pass**  |
|                        |                       |   _display_    |                                                           _Title_                                                            | **pass**  |
|                        |                       |   _display_    |                                                          _Synopsis_                                                          | **pass**  |
|                        | _Comment Icon_        |    _hover_     |                                                _Display 'View Comments' text_                                                | **pass**  |
|                        |                       |    _click_     |                                              _Redirect to comment detail page_                                               | **pass**  |
|                        | _Bookmark Icon_       |    _hover_     |                                               _Display 'View Bookmarks' text_                                                | **pass**  |
|                        |                       |    _click_     |                                                 _Redirect to bookmarks page_                                                 | **pass**  |
| **logged-in**          | **Book Component**    |                |                                                                                                                              |           |
|                        | _Comment Icon_        |    _hover_     |                                                _Display 'View Comments' text_                                                | **pass**  |
|                        |                       |    _click_     |                                              _Redirect to comment detail page_                                               | **pass**  |
|                        | _Bookmark Icon_       |    _hover_     |                                               _Display 'View Bookmarks' text_                                                | **pass**  |
|                        |                       |    _click_     |                                                 _Redirect to bookmarks page_                                                 | **pass**  |
|                        | _Bookmark options_    |   _display_    |                                   _Show the options to select or change a bookmark status_                                   | **pass**  |
|                        |                       |    _select_    |                   _Change the option selected and save in the database the change (update, add or delete)_                   | **pass**  |
|                        |                       |    _select_    |                                               _Notify the change as registed_                                                | **pass**  |
| **any user logged-in** | _Edit/Delete menu_    |   _display_    |                                             _display edit/delete dropdown menu_                                              | **pass**  |
|                        |                       |    _hover_     |                                                   _Pointer cursor change_                                                    | **pass**  |
|                        | _Edit icon_           |    _hover_     |                                                   _Add background colour_                                                    | **pass**  |
|                        |                       |    _click_     |                                                 _Redirect to book edit page_                                                 | **pass**  |
|                        | _Delete icon_         |    _hover_     |                                                   _Add background colour_                                                    | **pass**  |
|                        |                       |    _click_     | _If is the book created, the book will be removed from database in othercase a message will be showed with this information_ | **pass**  |
|                        |                       |                |                               _Notification - 'Book removed' if the user is the book creator_                                | **pass**  |

### _Add/Edit Book_

<br>

| Page/Status        | Element               |  Action   |                                        Expected Result                                         | Pass/Fail |
| ------------------ | --------------------- | :-------: | :--------------------------------------------------------------------------------------------: | :-------: |
| **Add book page**  |                       |           |       _If a book is not found after the search books, the option to add a book is shown_       |           |
|                    | _Add Book_            |  _click_  |                       _When click on Add Book, edit book form is showed_                       | **pass**  |
|                    | _Add a cover_         |  _click_  |                            _Opens your computer to select an image_                            | **pass**  |
|                    | _Change cover button_ | _display_ |                                      _Change text color_                                       | **pass**  |
|                    |                       |  _click_  |                          _Opens your computer to select a new image_                           | **pass**  |
|                    | _fields to edit_      | _display_ |           _The fields: title, auth, pub_date, publisher, pages_no, isbn, lang_orig,_           | **pass**  |
|                    |                       | _display_ |                 _lang, translators, genre and synopsis will be shown to edit_                  | **pass**  |
|                    |                       | _display_ | _the fields 'Language orig.' (lang_orig) and 'Language' (lang) must to be showed in a listbox_ | **pass**  |
|                    | _Cancel button_       |  _hover_  |                             _Change text colour and mouse pointer_                             | **pass**  |
|                    |                       |  _click_  |                                     _Redirect to homepage_                                     | **pass**  |
|                    | _Save button_         |  _hover_  |                             _Change text colour and mouse pointer_                             | **pass**  |
|                    |                       |  _click_  |                                  _redirect to new book page_                                   | **pass**  |
|                    |                       |           |                         _Success notifcation of a newly created book_                          | **pass**  |
| **Edit book page** | _Edit Book_           |  _click_  |               _When click on dropdown menu Edit book, edit book form is showed_                | **pass**  |
|                    | _Add or edit a cover_ |  _click_  |                            _Opens your computer to select an image_                            | **pass**  |
|                    | _Change cover button_ | _display_ |                                      _Change text color_                                       | **pass**  |
|                    |                       |  _click_  |                          _Opens your computer to select a new image_                           | **pass**  |
|                    | _fields to edit_      | _display_ |           _The fields: title, auth, pub_date, publisher, pages_no, isbn, lang_orig,_           | **pass**  |
|                    |                       | _display_ |                 _lang, translators, genre and synopsis will be shown to edit_                  | **pass**  |
|                    |                       | _display_ | _the fields 'Language orig.' (lang_orig) and 'Language' (lang) must to be showed in a listbox_ | **pass**  |
|                    | _Cancel button_       |  _hover_  |                             _Change text colour and mouse pointer_                             | **pass**  |
|                    |                       |  _click_  |                                     _Redirect to homepage_                                     | **pass**  |
|                    | _Save button_         |  _hover_  |                             _Change text colour and mouse pointer_                             | **pass**  |
|                    |                       |  _click_  |                                  _redirect to new book page_                                   | **pass**  |
|                    |                       |           |                            _Success notifcation of a updated book_                             | **pass**  |

### _Auth pages_

<br>

| Page/Status            | Element                      |               Action               |                                      Expected Result                                       | Pass/Fail |
| ---------------------- | ---------------------------- | :--------------------------------: | :----------------------------------------------------------------------------------------: | :-------: |
| **Sign up page**       | _Username input box_         |              _click_               |     _Clicking the username input box allows the user to input alphanumeric characters_     | **pass**  |
|                        | _Password input box_         |              _click_               |     _Clicking the password input box allows the user to input alphanumeric characters_     | **pass**  |
|                        | _Confirm password input box_ |             _display_              | _Clicking the confirm password input box allows the user to input alphanumeric characters_ | **pass**  |
|                        | _Sign up button_             |              _hover_               |                                    _Change text colour_                                    | **pass**  |
|                        |                              |              _click_               |                 _If valid data - signup user and redirect to sign-in page_                 | **pass**  |
|                        |                              |          _username-taken_          |                                  _Display error message_                                   | **pass**  |
|                        |                              |       _username field blank_       |                                  _Display error message_                                   | **pass**  |
|                        |                              |       _password field blank_       |                                  _Display error message_                                   | **pass**  |
|                        |                              |                                    |                                   _Success notification_                                   | **pass**  |
|                        | _Sign-in link_               |              _hover_               |                                      _Change colour_                                       | **pass**  |
|                        |                              |              _click_               |                                 _Redirect to sign-in page_                                 | **pass**  |
| **Sign in page**       | _Username input box_         |              _click_               |     _Clicking the username input box allows the user to input alphanumeric characters_     | **pass**  |
|                        | _Password input box_         |              _click_               |     _Clicking the password input box allows the user to input alphanumeric characters_     | **pass**  |
|                        | _Sign in button_             |              _hover_               |                                      _Change colour_                                       | **pass**  |
|                        |                              |              _click_               |                _If valid data - signin user and redirect to the home page_                 | **pass**  |
|                        |                              |       _username field blank_       |                           _Display error notification & message_                           | **pass**  |
|                        |                              |       _password field blank_       |                           _Display error notifcation & message_                            | **pass**  |
|                        | _Sign-up link_               |              _hover_               |                                      _Change colour_                                       | **pass**  |
|                        |                              |              _click_               |                                 _Redirect to sign-up page_                                 | **pass**  |
| **Sign out tab/modal** |                              |              _click_               |                             _Open sign out confirmation modal_                             | **pass**  |
|                        | _Modal_                      |        _click outside box_         |                                       _Close modal_                                        | **pass**  |
|                        |                              |     _click modal close button_     |                                       _Close modal_                                        | **pass**  |
|                        | _Cancel button_              |              _hover_               |                                      _Change colour_                                       | **pass**  |
|                        |                              |              _click_               |                                    _Return to homepage_                                    | **pass**  |
|                        | _Sign out button_            |              _hover_               |                                      _Change colour_                                       | **pass**  |
|                        |                              |              _click_               |                            _Log user out & return to homepage_                             | **pass**  |
|                        |                              |                                    |                            _Notification of successful logout_                             | **pass**  |
|                        |                              | _Notification of message recieved_ |                                          **pass**                                          |

### _Profiles_

<br>

| Page/Status        | Element                            |  Action   |                                           Expected Result                                           | Pass/Fail |
| ------------------ | ---------------------------------- | :-------: | :-------------------------------------------------------------------------------------------------: | :-------: |
| **ProfilePage.js** | _User Avatar_                      | _display_ |                                       _A users profile image_                                       | **pass**  |
|                    | _Profile settings in MoreDropDown_ | _display_ |                           _Only if the user is the owner of the profile_                            | **pass**  |
| **logged-out**     | _Comments Count_                   | _display_ |                               _Display a users total comments count_                                | **pass**  |
|                    | _Followers Count_                  | _display_ |                               _Display a users total followers count_                               | **pass**  |
|                    | _Following Count_                  | _display_ |                               _Display a users total following count_                               | **pass**  |
|                    | _Bookmarks Count_                  | _display_ |                               _Display a users total bookmarks count_                               | **pass**  |
|                    | _Stickers Count_                   | _display_ |                               _Display a users total stickers count_                                | **pass**  |
|                    | _Users comments_                   | _display_ |                            _Users comments using the comment component_                             | **pass**  |
|                    |                                    | _display_ |           _If a user has not uploaded any images display: No results found text & image_            | **pass**  |
| **logged-in**      | _Comments Count_                   | _display_ |                               _Display a users total comments count_                                | **pass**  |
|                    |                                    |           |            _When a user adds a new comment, the users comments count increments by one_             | **pass**  |
|                    | _Followers Count_                  | _display_ |                               _Display a users total followers count_                               | **pass**  |
|                    | _Following Count_                  | _display_ |                               _Display a users total following count_                               | **pass**  |
|                    |                                    |           | _When a user follows a user from the most followed component the following count increments by one_ | **pass**  |
|                    | _Follow Button_                    | _display_ |               _If the user is not the owner of the profile, display a follow button_                | **pass**  |
|                    |                                    |  _hover_  |                                             _Dark text_                                             | **pass**  |
|                    |                                    |  _click_  |                   _User is followed & the users followers count increments by 1_                    | **pass**  |
|                    |                                    |           |                                        _Database is updated_                                        | **pass**  |
|                    |                                    |           |                                       _Success notification_                                        | **pass**  |
|                    |                                    |           |                                    _Button changes to unfollow_                                     | **pass**  |
|                    | _Unfollow Button_                  | _display_ |               _If the user is not the owner of the profile, display a follow button_                | **pass**  |
|                    |                                    |  _hover_  |                                             _Dark text_                                             | **pass**  |
|                    |                                    |  _click_  |                  _User is unfollowed & the users followers count decrements by 1_                   | **pass**  |
|                    |                                    |           |                                        _Database is updated_                                        | **pass**  |
|                    |                                    |           |                                           _Notification_                                            | **pass**  |
|                    |                                    |           |                                     _Button changes to follow_                                      | **pass**  |
|                    | _Personal Information_             | _display_ |              _Display Name, Date of birth, Location, Favourite Location & Bio fields_               | **pass**  |
|                    |                                    | _display_ |                                 _If nothing selected, display icon_                                 | **pass**  |
|                    | _Users comments_                   | _display_ |                            _Users comments using the comment component_                             | **pass**  |
|                    |                                    | _display_ |           _If a user has not uploaded any images display: No results found text & image_            | **pass**  |
|                    | _Profile settings tab_             |  _click_  |                                    _Profile dropdown menu opens_                                    | **pass**  |
|                    | _Edit profile tab_                 |  _hover_  |                                          _Dark background_                                          | **pass**  |
|                    |                                    |  _click_  |                                      _Open edit profile page_                                       | **pass**  |
|                    | _Change password tab_              |  _hover_  |                                          _Dark background_                                          | **pass**  |
|                    |                                    |  _click_  |                                     _Open change password page_                                     | **pass**  |
|                    | _Change username tab_              |  _hover_  |                                          _Dark background_                                          | **pass**  |
|                    |                                    |  _click_  |                                     _Open change username tab_                                      | **pass**  |

| Page/Status              | Element                 |  Action   | Expected Result                                                                           | Pass/Fail |
| ------------------------ | ----------------------- | :-------: | ----------------------------------------------------------------------------------------- | --------- |
| **EditProfilePage.js**   | _Bio input field_       |  _click_  | _Clicking the input box allows the user to input alphanumeric characters_                 | **pass**  |
|                          | _Image input field_     | _display_ | _If the user has already selected an image, prepopulate with the previous image selected_ | **pass**  |
|                          |                         | _display_ | _Button to select an image from your computer_                                            | **pass**  |
|                          | _Image select button_   |  _click_  | _Open computer to select image_                                                           | **pass**  |
|                          |                         | _display_ | _When a user selects an image, it is displayed_                                           | **pass**  |
|                          | _Cancel button_         |  _hover_  | _Dark text_                                                                               | **pass**  |
|                          |                         |  _click_  | _Redirect to profile page_                                                                | **pass**  |
|                          | _Save button_           |  _hover_  | _Dark text_                                                                               | **pass**  |
|                          |                         |  _click_  | _With valid data, the profile is updated_                                                 | **pass**  |
|                          |                         |           | _Success notification_                                                                    | **pass**  |
| **Change Username page** | _Change username field_ |  _click_  | _Clicking the input box allows the user to input alphanumeric characters_                 | **pass**  |
|                          | _Cancel button_         |  _hover_  | _Dark text_                                                                               | **pass**  |
|                          |                         |  _click_  | _Redirect to profile page_                                                                | **pass**  |
|                          | _Save button_           |  _hover_  | _Dark text_                                                                               | **pass**  |
|                          |                         |  _click_  | _If correct inputted data, update username and return to profile page_                    | **pass**  |
|                          |                         |           | _Success notification_                                                                    | **pass**  |

---

## Automated Testing

Unfortunately, due to time constraints, automated testing could not be implemented for this project. However, it will be addressed and added as a future update.

## Validator Testing

### HTML

| Page         | Status |                                                      URL                                                      |
| ------------ | :----: | :-----------------------------------------------------------------------------------------------------------: |
| `index.html` | _pass_ | _[result](https://validator.w3.org/nu/?doc=https://drp-api-the-last-book-page-4bcf6d1799b5.herokuapp.com%2F)_ |

![HTML w3c validator](src/docs/testing/html/html-w3c-validation.webp)

The _[W3C HTML validator](https://validator.w3.org/)_ was used to test the one HTML file and **no errors** were reported in the final deployment.

![HTML validator results](src/docs/testing/html/html-result-no-errors.webp)

---

### CSS

The _[W3C CSS Validator](https://jigsaw.w3.org/css-validator/)_ was used to validate the project, the results are shown below with **no errors reported.**

![CSS w3c validator](frontend/src/docs/testing/css/css-w3c-validation.png)
![CSS Result](frontend/src/docs/testing/css/css-last-page.png)

- _[ CSS results](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdrp-api-the-last-book-page-4bcf6d1799b5.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=es)_

---

### JavaScript

_[JSHint](https://jshint.com/)_ was used to check the JavaScript within the application, the results are shown below with all pages passing and **no errors reported.**

![JSHint Logo](src/docs/testing/javascript/testing-jshint.webp)

|     Folder     |            Page            |  Status  |
| :------------: | :------------------------: | :------: |
| **Components** |                            |          |
|                |         `Asset.js`         | **pass** |
|                |        `Avatar.js`         | **pass** |
|                |        `NavBar.js`         | **pass** |
|                |    `MoreDropdownBar.js`    | **pass** |
|                |      `SideNavBar.js`       | **pass** |
|                |     `PageNotFound.js`      | **pass** |
|                |      `ResumeText.js`       | **pass** |
|  **Contexts**  |                            |
|                |  `CurrentUserContext.js`   | **pass** |
|                |  `ProfileDataContext.js`   | **pass** |
|   **Hooks**    |                            |
|                |      `UseRedirect.js`      | **pass** |
|                | `useClickOutsideToggle.js` | **pass** |
|   **Pages**    |                            |
|     _auth_     |      `SignInForm.js`       | **pass** |
|                |      `SignUpForm.js`       | **pass** |
|    _books_     |         `Book.js`          | **pass** |
|                |     `BookEditForm.js`      | **pass** |
|                |       `BooksPage.js`       | **pass** |
|                |       `BookPage.js`        | **pass** |
|  _bookmarks_   |       `Bookmark.js`        | **pass** |
|                |     `BookmarkPage.js`      | **pass** |
|   _comments_   |        `Comment.js`        | **pass** |
|                |   `CommentCreateForm.js`   | **pass** |
|                |    `CommentEditForm.js`    | **pass** |
|                |      `CommentPage.js`      | **pass** |
|                |     `CommentsPage.js`      | **pass** |
|   _stickers_   |        `Sticker.js`        | **pass** |
|                |   `StickerCreateForm.js`   | **pass** |
|                |    `StickerEditForm.js`    | **pass** |
|   _profiles_   |    `PopularProfiles.js`    | **pass** |
|                |        `Profile.js`        | **pass** |
|                |    `ProfileEditForm.js`    | **pass** |
|                |      `ProfilePage.js`      | **pass** |
|                |     `UsernameForm.js`      | **pass** |
|                |   `UserPasswordForm.js`    | **pass** |
|   **Utils**    |                            |
|                |         `Utils.js`         | **pass** |
|    **src**     |                            |          |
|                |          `App.js`          | **pass** |
|                |         `index.js`         | **pass** |

---

### Lighthouse

I have run the website through Google Chrome's Lighthouse audit application and the results are shown below.
Mobile testing has been performed too and reported similar results to the desktop but with a lower performance score.

| Page                   |                                                   Desktop                                                   |
| ---------------------- | :---------------------------------------------------------------------------------------------------------: |
| Home page              |          ![lighthouse result desktop home](frontend/src/docs/testing/lighthouse/desktop-home.png)           |
| `SignInForm.js`        |       ![lighthouse result desktop sign-in](frontend/src/docs/testing/lighthouse/desktop-sign-in.png)        |
| `SignUpForm.js`        |       ![lighthouse result desktop sign-up](frontend/src/docs/testing/lighthouse/desktop-sign-up.png)        |
| `CommentsPage.js`      | ![lighthouse result desktop comment detail](frontend/src/docs/testing/lighthouse/desktop-comments-page.png) |
| `CommentCreateForm.js` |   ![lighthouse result desktop add comment](frontend/src/docs/testing/lighthouse/desktop-add-comment.png)    |
| `CommentEditForm.js`   |  ![lighthouse result desktop edit comment](frontend/src/docs/testing/lighthouse/desktop-edit-comment.png)   |
| `BooksPage.js`         |     ![lighthouse result desktop group list](frontend/src/docs/testing/lighthouse/desktop-bookspage.png)     |
| `BookEditForm.js`      | ![lighthouse result desktop create group](frontend/src/docs/testing/lighthouse/desktop-book-edit-form.png)  |
| `BookmarkPage.js`      |  ![lighthouse result desktop create group](frontend/src/docs/testing/lighthouse/desktop-bookmark-page.png)  |
| `ProfilePage.js`       |  ![lighthouse result desktop profile page](frontend/src/docs/testing/lighthouse/desktop-profile-page.png)   |

---

## Browser Testing

The Website was tested on Google Chrome, Microsoft Edge with no issues reported.

---

## Device Testing

The website has been viewed on a variety of devices such as Desktop, Laptop, iPad, & Samsung Galaxy A70 to ensure that the responsive design worked as intended. [Chrome DevTools](https://developer.chrome.com/docs/devtools/) was used to test the responsiveness on different devices.

### Mobile

The site has been tested through Google's [Mobile friendly test](https://search.google.com/test/mobile-friendly) with all pages passing.

---

### Fixed Bugs

### Unfixed Bugs
