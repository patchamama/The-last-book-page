# **_The last book page - Django REST Framework API_**

![Last page logo](docs/logo-sd.png)

# Objective

The reason for this API is to provide all the information required for querying and updating data from the front-end "The last book page". To do this using the (MVC) pattern, this application manages the model and controller that serve the data required by the front-end (the View managed with React). To meet its objectives, exhaustive tests are carried out to validate the correct manipulation of data and limited and secure access to the data, depending on the pre-established permissions in the application, taking care of security.

# User Experience (UX)

### User Stories

In total 48 User Stories have been created and executed in 15 Epics (Milestones). In the backend 20 User Stories with 8 Epics, and in the Frontend 26 User Stories with 7 Epics (2 User Stories are pending).
Epic 11 was added in the backend while the frontend was being developed to add the option to insert stickers in comments and have the API provide that information. Search fields were sometimes added in the backend to meet the frontend's wishes for search and display information. In the commit history you can see how the tasks were executed as the development of the application progressed.

## Backend Django REST API

### Epic#1

[#1](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/1) As a **Developer**, I can **create and develop the profiles app** so that **the users can create their own profiles**

[#2](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/2) As a **Developer**, I can **serialize the profiles app** so that **the data can be used as python native datatype and can be render to JSON**

[#15](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/15) As a **Developer**, I can **, I can install Django with its dependencies** so that ** can be created the project and apps to develop**

### Epic#2

[#13](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/13) As a **Developer**, I can **Install and develop the books app** so that **users can create their own books**

[#14](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/14) As a **Developer**, I can **serialize the books app** so that **the data can be used as python native datatype and can be render to JSON**

### Epic#3

[#3](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/3) As a **Developer**, I can **Install and develop the comments app** so that **users can create their own comments**

[#4](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/4) As a **Developer**, I can **serialize the comments app** so that **the data can be used as python native datatype and can be render to JSON**

[#5](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/5) As a **Developer**, I can **develop the comment detail view** so that **the user can develop Read, Update, Delete and retrieve data of comments**

[#6](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/6) As a **Developer**, I can **serialize the comments detail app** so that **the data can be used as python native datatype and can be render to JSON**

### Epic#4

[#7](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/7) As a **Developer**, I can **Install and develop the likes app** so that **users can create their own likes**

[#8](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/8) As a **Developer**, I can **serialize the likes app** so that **the data can be used as python native datatype and can be render to JSON**

### Epic#5

[#11](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/11) As a **Developer**, I can **Install and develop the followers app** so that **users can create their own followers**

[#12](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/12) As a **Developer**, I can **serialize the followers app** so that **the data can be used as python native datatype and can be render to JSON**

### Epic#6

[#9](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/9) As a **Developer**, I can **Install and develop the bookmarks app** so that **users can create their own bookmarks**

[#10](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/10) As a **Developer**, I can **serialize the bookmarks app** so that **the data can be used as python native datatype and can be render to JSON**

### Epic#7

[#16](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/16) As a **Developer**, I can **optimize, document and fix bugs** so that **users can use the API with the expected functionalities**

[#17](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/17) As a **Developer**, I can **create filters** so that **users can access as much useful data as the API can provide**

[#19](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/19) As a **Developer**, I can **program tests to evaluate the behaviour of the api** so that **users can get the expected functionalities**

### Epic#11

[#36](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/36) - As a **Developer**, I can **Install and develop the stickers app** so that **users can add notes to comments of books**

[#37](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/37) As a **Developer**, I can **serialize the stickers app** so that **the data can be used as python native datatype and can be render to JSON**

## Frontend React

### Epic#8

[#20](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/20) As a **User**, I can **register an account** so that **, I can access to the features available to registered users**

[#21](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/21) As a **User**, I can **access to a navigation bar on every page** so that **, I can easily view and access to desired content**

[#22](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/22) As a **User**, I can **register for an account** so that **, I can access to information dedicated to registered users**

[#23](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/23) As a **User**, I can **log out** so that **, I can safely disconnect from the site**

[#24](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/24) As a **logged-in User**, I can **see my login status** so that **I know my status of logged in or logged out of my account**

### Epic#9

[#27](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/27) As a **User**, I can **view the complete comments** so that **, I can access and read the comments of the app**

[#28](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/28) As a **logged-in User**, I can **create comments** so that **, I can add content to the website**

[#31](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/31) As a **logged-in User**, I can **like a comment** so that **, I can show my approval and interest in the commentary**

[#32](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/32) As a **User**, I can **see the newest comments at the top** so that **I am up to date with the latest content**

### Epic#10

[#29](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/29) As a **logged-in User**, I can **edit my comments** so that **, I can update and do corrections of my contents added**

[#30](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/30) As a **logged-in User**, I can **delete my comments** so that **, I can remove any comment that I don't want to share more**

[#33](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/33) As a **User**, I can **keep scrolling through the images that are loaded automatically** so that **I visit all the browse easy all the content**

[#34](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/34) As User**, I can **search the content easily** so that **, I can find with simplicity any wished information\*\*

### Epic#12

[#38](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/38) As a **User**, I can **view stickers on comments** so that **, I can read other user**

[#40](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/40) As a **logged-in User and owner of the sticker**, I can **update my sticker** so that **, I can fix any error**

[#41](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/41) As a **logged-in User and owner of the sticker**, I can **delete my sticker** so that **, I can remove any unwanted sticker from the site**

### Epic#13

[#42](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/42) As a **User**, I can **view the profiles of other users** so that **, I can see their bio and learn more about them**

[#43](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/43) As a **logged-in User**, I can **customise my profile with an avatar** so that **my profile can be easy to be identified within the site**

[#44](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/44) As a **logged-in User**, I can **have the option to follow/unfollow users** so that **, I can keep track of their content**

### Epic#14

[#46](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/46) As a **logged-in User**, I can **add new books** so that **, I can add comments about the book**

[#47](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/47) As a **logged-in User**, I can **edit and update any book** so that **, I can fix or update the content of fields**

[#48](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/48) As a **logged-in User**, I can **delete books that I have created** so that **, I can delete books duplicated or not desired**

### Epic#15

[#49](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/49) As a **logged-in User**, I can **delete books that I have created** so that **, I can delete books duplicated or not desired**

[#50](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/50) As a **Logged-in User**, I can **view the list of my bookmarks,** so that **, I can to see the books to check and review**

[#51](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/51) As a **logged-in User**, I can **edit and change any bookmark** so that **, I can change the status of the book in my bookmark**

[#52](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/52) As a **logged-in User**, I can **remove a bookmark** so that **, I can remove bookmarks of book not desired**

## Pending

[#53](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/53) As **logged-in User**, I can **send message to any other user,** so that **I can do any communication about books comments, readings...**

[#54](https://github.com/patchamama/PP5-drf-api-The-last-book-page/issues/54) As **logged-in User**, I can **read messages from any user,** so that **, I can be informed about any communication received**

# Agile Methodology

For the management of the development of the application, an agile approach was used and for this purpose a kanban board was used as you can see in the [link](https://github.com/users/patchamama/projects/8/views/1).

![GitHub kanban board](docs/agile/kanban.png)

# Entity Relationship Diagram

To create the entity relationship diagram, I used a graph modelling tool [Miro](https://miro.com/). It shows the relationship between all models in the database.

![Entity Relationship Diagram](docs/model_database.png)

# Database

A PostgreSQL database hosted by ElephantSQL was used throughout most of the process during the production process. SQLite was only used in the initial steps to create the structure (model) of the tables.

# Models

### Comment

The Comment model will allow users to create their own comments about any existed book and this is defined by several fields. The owner field is a OneToOneField that establishes a relationship with the User model, specifying that each comment can only have one owner. The `created_on` and `updated_on` fields are DateTimeFields that are automatically set to the time of creation and last modification of the comment, respectively. The comment field is a TextField that can allows for a longer description of the comment's content. The book field establishes a one-to-many relationship of the Book model with Comment allowing to create different comments for the same book from one or several users (`owner` field that relates to the User model in the same one-to-many way: one user can have several comments). The owner and the book fields are ForeignKeys, that creates a relationship between the model and the User and Book model, indicating that each Commment instance belongs to one user and one book. The on_delete=models.CASCADE argument specifies that if the associated user or book is deleted, all related Comment instances will also be deleted.

| **Field name** | **Field Type** | **Field Argument**               |
| -------------- | -------------- | -------------------------------- |
| owner          | FK             | `User, on_delete=models.CASCADE` |
| book           | FK             | `Book, on_delete=models.CASCADE` |
| comment        | TextField      |                                  |
| created_on     | DateTimeField  | `auto_now_add=True`              |
| updated_on     | DateTimeField  | `auto_now=True`                  |

### Sticker

The Sticker template allows the user to create personal notes or stickers of a comment on an entry. If a comment is deleted, the sticker is removed from both the user model and the entry model. The `created_on` and `updated_on` fields are DateTimeFields that are automatically set to the time the sticker was created and last modified, respectively. The owner and the comment fields are ForeignKeys, that creates a relationship between the model and the User and Comment model, indicating that each Sticker instance belongs to one user and one comment. The on_delete=models.CASCADE argument specifies that if the associated user or comment is deleted, all related Sticker instances will also be deleted.

| **Field name** | **Field Type** | **Field Argument**                  |
| -------------- | -------------- | ----------------------------------- |
| owner          | FK             | `User, on_delete=models.CASCADE`    |
| comment        | FK             | `Comment, on_delete=models.CASCADE` |
| sticker        | TextField      |                                     |
| created_on     | DateTime       | `auto_now_add=True`                 |
| updated_on     | DateTime       | `auto_now=True`                     |

### Book

The Book model contains the entire record with the fields relating to a book (title, author, date of publication, publisher, number of pages, isbn, original language of publication and current language of the book in the record, genre, synopsis and book cover). This model has some autonomy but the User who creates and updates it is registered (to protect that only it can delete it: `created_by` and `updated_by`). Other models such as Comment and Bookmarks reference this model for their purposes. The `created_on` and `updated_on` fields are DateTimeFields that are automatically set to the time the sticker was created and last modified, respectively.

| **Field name** | **Field Type** | **Field Argument**                                                                      |
| -------------- | -------------- | --------------------------------------------------------------------------------------- |
| title          | Char           | `max_length=150, unique=False`                                                          |
| auth           | Char           | `max_length=150, unique=False`                                                          |
| pub_date       | DateTime       | `blank=True, null=True`                                                                 |
| publisher      | Char           | `max_length=100, unique=False, blank=True`                                              |
| pages_no       | Integer        | `default=0`                                                                             |
| isbn           | Char           | `max_length=13, unique=False, blank=True`                                               |
| lang_orig      | Char           | `max_length=50, choices=LANGUAGES, blank=True`                                          |
| lang           | Char           | `max_length=50, choices=LANGUAGES, blank=True`                                          |
| translators    | Char           | `max_length=200, unique=False, blank=True`                                              |
| genre          | Text           | `blank=True`                                                                            |
| synopsis       | Text           | `blank=True`                                                                            |
| cover          | Image          | `upload_to='images/', default='../No_image_available.svg_t2xrtz.png'`                   |
| created_by     | FK             | `User, on_delete=models.SET_NULL, related_name="book_createdby", blank=True, null=True` |
| updated_by     | FK             | `User, on_delete=models.SET_NULL, related_name="book_updatedby", blank=True, null=True` |
| created_on     | DateTime       | `auto_now_add=True`                                                                     |
| updated_on     | DateTime       | `auto_now=True`                                                                         |

### Bookmark

The Bookmark model allows to register the status or interest of users in a book (e.g.: to read, to check, read, ...). To fulfil its objective, it is related through the `owner` field with the User model and `book` with the Book model in a one-to-many relationship, which allows that a book can have several bookmarks (statuses) from one or many users, as well as that a user can have several books with different options to be consulted. The `owner` field is a ForeignKey that creates a relationship between the Bookmark model and the User model, indicating that each Bookmark instance belongs to one user. The on_delete=models.CASCADE argument specifies that if the associated user is deleted, all related Bookmark instances will also be deleted. The book field is also a ForeignKey, creating a relationship between the Bookmark model and the Book model. The on_delete=models.CASCADE argument specifies that if the associated book is deleted, all related Bookmark instances will also be deleted. The `created_on` and `updated_on` fields are DateTimeFields that are automatically set to the time the sticker was created and last modified, respectively.

| **Field name** | **Field Type** | **Field Argument**                                           |
| -------------- | -------------- | ------------------------------------------------------------ |
| owner          | FK             | `User, on_delete=models.CASCADE`                             |
| book           | FK             | `Book, on_delete=models.CASCADE`                             |
| status         | Char           | `max_length=25, choices=STATUS_TYPE, default='Want to read'` |
| created_on     | DateTime       | `auto_now_add=True`                                          |

### User (predefined for the system admin)

The User model is predefined by Django for authentication management and as an extension of the data provided, the Profile model is added, which is related one-to-one with User and allows access to more user data. This model has a central position in the relationship diagram as it is present in the other models by referencing it.

| **Field name** | **Field Type** | **Field Argument** |
| -------------- | -------------- | ------------------ |
| first_name     | Char           |                    |
| last_name      | Char           |                    |
| email          | Char           |                    |
| is_active      | Boolean        |                    |

### Profile

The Profile model in Django has a unique one-to-one relationship with the User model, meaning that each registered user on the website will have a corresponding Profile model. This allows for additional values to be defined relative to the user, such as an image and language. The Profile model serves as a convenient extension to the User model, providing an efficient way to store and access user-specific information. The on_delete=models.CASCADE argument of `owner` specifies that if the associated user is deleted, all related Profile instances will also be deleted.

| **Field name** | **Field Type** | **Field Argument**                                             |
| -------------- | -------------- | -------------------------------------------------------------- |
| owner          | OneToOne       | `User, on_delete=models.CASCADE`                               |
| name           | Char           | `max_length=200, blank=True`                                   |
| date_of_birth  | Date           | `blank=True, null=True`                                        |
| language       | Char           | `max_length=50, choices=LANGUAGES, blank=True`                 |
| image          | Image          | `upload_to='images/', default='../default_profile_hk81a7.jpg'` |
| created_on     | DateTime       | `auto_now_add=True`                                            |
| updated_on     | DateTime       | `auto_now=True`                                                |

### Follower

The owner field is a ForeignKey that creates a relationship between the Follow model and the User model, indicating that each Follow instance belongs to one user. The related_name='following' argument specifies the reverse relation from the User model to the Follow model, allowing users to access their associated following instances. The on_delete=models.CASCADE argument specifies that if the associated user is deleted, all related Follow instances will also be deleted. The followed field is also a ForeignKey, creating a relationship between the Follow model and the User model. The related_name='followed' argument specifies the reverse relation from the User model to the Follow model, allowing users to access their associated followed instances. The on_delete=models.CASCADE argument specifies that if the associated user is deleted, all related Follow instances will also be deleted.

| **Field name** | **Field Type** | **Field Argument**                                         |
| -------------- | -------------- | ---------------------------------------------------------- |
| owner          | FK             | `User, related_name='following', on_delete=models.CASCADE` |
| followed       | FK             | `User, related_name='followed', on_delete=models.CASCADE`  |
| created_on     | DateTime       | `auto_now_add=True`                                        |

### Like

The owner field is a ForeignKey that creates a relationship between the Like model and the User model, indicating that each Like instance belongs to one user. The on_delete=models.CASCADE argument specifies that if the associated user is deleted, all related Like instances will also be deleted. The post field is also a ForeignKey, creating a relationship between the Like model and the Comment model. The related_name='likes' argument specifies the reverse relation from the Comment model to the Like model, allowing comments to access their associated likes. The on_delete=models.CASCADE argument specifies that if the associated comment is deleted, all related Like instances will also be deleted.

| **Field name** | **Field Type** | **Field Argument**                                        |
| -------------- | -------------- | --------------------------------------------------------- |
| owner          | FK             | `User, on_delete=models.CASCADE`                          |
| comment        | FK             | `Comment, related_name='likes', on_delete=models.CASCADE` |
| created_on     | DateTime       | `auto_now_add=True`                                       |

# Testing

### Python

#### PEP8 Validation

To test the Python Code, I used the Code Institutes [PEP8](https://pep8ci.herokuapp.com/). The table below shows the pages tested and their result, all pages are error-free in the final deployment.

| _File / App_     | **drf_api_lastpage** | **comments** | **stickers** | **books** |
| ---------------- | :------------------: | :----------: | :----------: | :-------: |
| `admin.py`       |        _n/a_         |    _pass_    |    _n/a_     |   _pass_   |
| `apps.py`        |        _n/a_         |    _pass_    |    _pass_    |  _pass_   |
| `permissions.py` |        _pass_        |    _n/a_     |    _n/a_     |   _n/a_   |
| `serializers.py` |        _pass_        |    _pass_    |    _pass_    |  _pass_   |
| `models.py`      |        _n/a_         |    _pass_    |    _pass_    |  _pass_   |
| `urls.py`        |        _pass_        |    _pass_    |    _pass_    |  _pass_   |
| `views.py`       |        _n/a_         |    _pass_    |    _pass_    |  _pass_   |
| `wsgi.py`        |        _pass_        |    _n/a_     |    _n/a_     |   _n/a_   |

| _File / App_     | **bookmarks** | **profiles** | **followers** | **likes** |
| ---------------- | :-----------: | :----------: | :-----------: | :-------: |
| `admin.py`       |     _pass_     |    _pass_     |     _n/a_     |   _n/a_   |
| `apps.py`        |    _pass_     |    _pass_    |    _pass_     |  _pass_   |
| `permissions.py` |     _n/a_     |    _n/a_     |     _n/a_     |   _n/a_   |
| `serializers.py` |    _pass_     |    _pass_    |    _pass_     |  _pass_   |
| `models.py`      |    _pass_     |    _pass_    |    _pass_     |  _pass_   |
| `urls.py`        |    _pass_     |    _pass_    |    _pass_     |  _pass_   |
| `views.py`       |    _pass_     |    _pass_    |    _pass_     |  _pass_   |
| `wsgi.py`        |     _n/a_     |    _n/a_     |     _n/a_     |   _n/a_   |

## Manual Testing

## Security Fixed

During the updates in git I did not check the updates to be discarded in the .gitignore file, which resulted in the env.py file being published with the cloudinary, postgres (ElephantSQL) and secret-key keys. This determined to regenerate the keys again and update them in env.py and the configuration variables in heroku.

## Bugs Fixed

- In the app comments/serializers.py don't render the image cover of the book with the line:

```
book_cover = serializers.ReadOnlyField(source='book.cover.image.url')
```

after a lot of tests/debugs and the checking of the documentation was resolve with the line:

```
book_cover = serializers.ImageField(source='book.cover', read_only=True)
```

## Bugs Unresolved

# Technologies Used

## Languages

## Libraries and Frameworks

## Other Tools

# Development

## Installing Django and libraries

### Install Django

```
pip3 install 'django<4'
```

_The Long Term Support (LTS 3.2.x) version (in my case 3.2.20) will installed and is the most advisable for production as it is kept up to date with security patches._

### Create Project

```
django-admin startproject drf_api_lastpage .
```

_A new directory called your `'drf_api_lastpage'` and a `manage.py` file will be created within your project folder._

### Install Cloudinary Storage to connect Django with Cloudinary

```
pip install django-cloudinary-storage==0.3.0
```

### Install Pillow (to Image Processing)

```
pip install Pillow==8.2.0
```

### Install apps of the project

```
python3 manage.py startapp profiles
python3 manage.py startapp books
python3 manage.py startapp comments
python3 manage.py startapp likes
python3 manage.py startapp bookmarks
python3 manage.py startapp followers
```

### Add Installed Apps in settings `drf_api_lastpage/settings.py`

```
INSTALLED_APPS = [
    (...)
    **'cloudinary_storage',**
    'django.contrib.staticfiles',
    **'cloudinary',**

    'profiles',
    'books',
    'comments',
    'likes',
    'bookmarks',
    'followers'
]
```

_Note: Cloudinary storage must go before django.contrib.staticfiles, as shown._
_Note: Text in **bold** is newly added code_

### Add the following lines in `drf_api_lastpage/settings.py`

- Import os

```
from pathlib import Path
import os
```

- Add statement to import env.py if it exists - _below import os_

```
if os.path.exists('env.py'):
    import env
```

- Set CLOUDINARY_STORAGE variable equals to the CLOUDINARY_URL variable and place directly below imports

```
CLOUDINARY_STORAGE = {
    'CLOUDINARY_URL': os.environ.get('CLOUDINARY_URL')
}
```

- Define Media Storage URL and place directly below

```
MEDIA_URL = '/media/'
```

- Define Default File Storage to Cloudinary and place directly below

```
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

### Create an `env.py` file within the top level directory with the follow content:

```
import os
os.environ['CLOUDINARY_URL'] = 'cloudinary://**<cloudinary_key>**'
```

_Note: Ensure `env.py` is listed in the .gitignore file so it does not get pushed to GitHub._
_Note: URL value copied from [Cloudinary Account Desktop](https://console.cloudinary.com/console/). Make sure to only paste the correct part of the URL_

###

# Deployment

# Credits

- Django Documentation: https://docs.djangoproject.com/en/4.2/ref/models/fields/
- Images of profiles: https://www.pexels.com/
- To generate secret-keys: https://djecrety.ir/
- The logo was created by https://Logo.com

# Acknowledgments
