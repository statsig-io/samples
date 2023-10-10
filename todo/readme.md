## Statsig integration with JAVA based server side todo

### A server side application developed in springboot
### Support TODO application
### It supports both the MySql and H2 database
#### Default this support inbuilt H2 database to support the MySql uncomment the MySql dependency.
### Apis
#### To create a TODO
Method: Post

http://localhost:8080/todos

#### To fetch all todos
Method: Get

http://localhost:8080/todos

#### Get todo by {id}
Method: Get

http://localhost:8080/todos/{id}

#### Delete todo by {id}
Method: Delete

http://localhost:8080/todos/{id}

#### Update todo
Method: Put

http://localhost:8080/todos

### Steps to access h2 database
Go to the h2 console link in local: http://localhost:8080/h2-console
Set JDBC url to : jdbc:h2:~/todo_db
Username: sa
password: 



