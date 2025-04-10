# Django Blog Project

This is a simple blog project built with Django and React.

## Features
- **User Registration** and **Login** functionality.
- Users can create, view, edit, and delete their own articles.
- Admin users have the ability to manage all articles and users.
- Users can post, edit, and delete comments on articles.

## Setup and Installation

### Requirements
- Python 3.x- PostgreSQL or SQLite (configured in settings)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/django_blog_project.git
   Backend Setup:

Navigate to the project directory:

bash
Copy
cd django_blog_project
Create a virtual environment:

bash
Copy
python -m venv env
Activate the virtual environment:

On Windows:

bash
Copy
.\env\Scripts\activate
On macOS/Linux:

bash
Copy
source env/bin/activate
Install dependencies:

bash
Copy
pip install -r requirements.txt
Run migrations:

bash
Copy
python manage.py migrate
Create a superuser (admin):

bash
Copy
python manage.py createsuperuser
Start the Django development server:

bash
Copy
python manage.py runserver
Frontend Setup:

Navigate to the frontend directory:

bash
Copy
cd frontend
Install frontend dependencies:

bash
Copy
npm install
Start the React development server:

bash
Copy
npm start
Admin User
Username: yair1122

Password: yair1122 (same as username)

User Example
Username: yair

Password: 123456

API Documentation
GET /api/articles/ - Get all articles.

POST /api/articles/ - Create a new article (Authenticated only).

GET /api/articles/{id}/ - Get a specific article.

PUT /api/articles/{id}/ - Update an article (Admin/Owner only).

DELETE /api/articles/{id}/ - Delete an article (Admin/Owner only).

POST /api/comments/ - Post a comment on an article (Authenticated only).

GET /api/comments/{article_id}/ - Get comments for a specific article.

PUT /api/comments/{id}/ - Edit a comment (Owner/Admin only).

DELETE /api/comments/{id}/ - Delete a comment (Owner/Admin only).

Contributing
Fork the repository.

Create a new branch (git checkout -b feature-branch).

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature-branch).

Create a new Pull Request.

yaml
Copy

