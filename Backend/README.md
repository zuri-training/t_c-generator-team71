## Dependencies
- Python - ideally any version from 3.6 [Get Python](https://www.python.org/)
- Django
- You should have knowledge of django rest framework, API creation, serialization etc

## Starting the project
- Fork and clone the repo
- create and activate virtual environment [Guide](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/).
- Create a different branch with your name and make it the remote host
- Install requirements - ` pip install -r requirements.txt `
- Run `python manage.py makemigrations`
- Run `python manage.py migrate`
- Run `python manage.py runserver to run the server`

## Testing the endpoints
- go to localhost:8000/swagger/ to test with the swagger ui doc or localhost:8000/redoc/ 
### Testing with a frontend client
- Go to the [settings.py](/terms_gen_home/settings.py)
- Add your frontend url to the 'CORS_ALLOWED_ORIGINS' list
- The project makes use of jwt authentication, make sure you are familiar with how to handle jwt authentication



## app descriptions
- **p_p** module holds the privacy policy application and all endpoints and work required for the privacy policy should only be done in there
- **t_c** module holds the terms and conditions application and all endpoints and work required for the terms and conditions should only be done in there
- **users** module holds the users/auth application and all endpoints and work required for the users should only be done in there