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


#### Steps to set up the code and run the apis in system
1) Make sure Maven and JDK is installed in the system
2) Take the latest code from samples/todo at develop · statsig-io/samples (github.com)
3) Open the command prompt or system termial
4) Navigate till pom.xml of the project file
5) Run the command 'mvn clean'
6) Run the command 'mvn install' to create the jar file
7) After mvn install it create the target file
8) Navigate till targer file and run the command
   java -jar todo-0.0.1-SNAPSHOT.jar
   This will start the server on port 8080
9) We can see the database at
   http://localhost:8080/h2-console

10) To create the Todo (with sample data)
curl -s POST -H "Content-Type: application/json" -d '{"serialNumber": 10,"task": "task9","completed": false,"description": "","edited": false,"createdDate": "2023-10-06T10:41:11.806Z","modifiedDate": "2023-10-06T10:41:11.806Z","lastViewed": false}'
http://localhost:8080/todos

11) To get all the Todos
    curl -s http://localhost:8080/todos

12) To get a Todo by id
    curl -s http://localhost:8080/todos/{id}

13) To delete a Todo by id
curl -X DELETE http://localhost:8080/todos/{id}

14) To update a Todo (with sample data)
curl -s PUT -H "Content-Type: application/json" -d '{"serialNumber": 10,"task": "task9","completed": false,"description": "","edited": false,"createdDate": "2023-10-06T10:41:11.806Z","modifiedDate": "2023-10-06T10:41:11.806Z","lastViewed": true, "id":70}' http://localhost:8080/todos


#### Steps to access h2 database
Go to the h2 console link in local: http://localhost:8080/h2-console

Set JDBC url to : jdbc:h2:~/todo_db
Username: sa
password: