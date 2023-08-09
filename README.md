# **_The last book page - Django REST Framework API_**


# Objective

The purpose of this API is to provide data in an efficient and secure way to support the front-end project "The last book page". My goal is to create clear and concise data models that meet the needs of the project. Each API endpoint has been carefully designed to fulfil a specific function and has been thoroughly tested to ensure that manipulation of the data is limited to authorised users only.

The reason for this API is to provide all the information required for querying and updating data from the front-end "The last book page". To do this using the (MVC) pattern, this application manages the model and controller that serve the data required by the front-end (the View managed with React). To meet its objectives, exhaustive tests are carried out to validate the correct manipulation of data and limited and secure access to the data, depending on the pre-established permissions in the application, taking care of security.

# User Experience (UX)

### User Stories

# Agile Methodology

# Entity Relationship Diagram

# Database

# Models

# Testing

### Python

#### PEP8 Validation

## Manual Testing

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

# Acknowledgments
