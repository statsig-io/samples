#### TODO project in Go Lang

##### Go version

```go version go1.21.4 windows/amd64```

##### Run the project
Navigate till main.go file in project and execute command

```go run main.go```

#### To build the project
Navigate till main.go file in project and execute command

```go build main.go```

This will create **main.exe** file, double click to run this exe file


### API Structure

The Todo App CRUD API is a set of endpoints that allow users to perform CRUD (Create, Read, Update, Delete) operations on todo items in the Todo App. 

The API includes the following endpoints:

- `GET /todos`: Retrieves a list of all todo items.
- `GET /todos/{id}`: Retrieves a specific todo item by its ID.
- `POST /todos`: Creates a new todo item.
- `PUT /todos`: Updates an existing todo item.
- `DELETE /todos/{id}`: Deletes a todo item.

Each endpoint accepts and returns JSON data.

Sample CURL requests with responses for the Todo App CRUD API:

1. Retrieve a list of all todo items:
    
    ```bash
    curl -s http://localhost:8080/todos
    ```
    
    Response:
    
    ```json
    [
    {
        "id": 1,
        "task": "task1",
        "description": "",
        "completed": false,
        "edited": false,
        "lastViewed": false,
        "serialNumber": 1,
        "createdDate": "2023-10-18T07:12:31.830Z",
        "modifiedDate": "2023-10-18T07:12:31.830Z"
    },
    {
        "id": 2,
        "task": "task2",
        "description": "",
        "completed": false,
        "edited": false,
        "lastViewed": false,
        "serialNumber": 2,
        "createdDate": "2023-10-18T07:12:34.746Z",
        "modifiedDate": "2023-10-18T07:12:34.746Z"
    },
    ....
]
    ```
    
2. Retrieve a specific todo item by its ID:
    
    ```bash
    curl -s http://localhost:8080/todos/{id}
    ```
    
    Response:
    
    ```json
   {
        "id": 1,
        "task": "task1",
        "description": "",
        "completed": false,
        "edited": false,
        "lastViewed": false,
        "serialNumber": 1,
        "createdDate": "2023-10-18T07:12:31.830Z",
        "modifiedDate": "2023-10-18T07:12:31.830Z"
    }
    ```
    
3. Create a new todo item:
    
    ```bash
   curl -s POST -H "Content-Type: application/json" -d '{"serialNumber": 10,"task": "task9","completed": false,"description": "","edited": false,"createdDate": "2023-10-06T10:41:11.806Z","modifiedDate": "2023-10-06T10:41:11.806Z","lastViewed": false}' http://localhost:8080/todos
    ```
    
    Response:
    
    ```json
   {
    "id": 7,
    "task": "task9",
    "description": "",
    "completed": 0,
    "edited": 0,
    "serialNumber": 10,
    "lastViewed": 0,
    "createdDate": "2023-10-06T10:41:11.806Z",
    "modifiedDate": "2023-10-06T10:41:11.806Z"
}
    ```
    
4. Update an existing todo item:
    
    ```bash
    curl -s PUT -H "Content-Type: application/json" -d '{"serialNumber": 10,"task": "task9","completed": false,"description": "","edited": true,"createdDate": "2023-10-06T10:41:11.806Z","modifiedDate": "2023-10-06T10:41:11.806Z","lastViewed": true, "id":7}' http://localhost:8080/todos
    ```
    
    Response:
    
    ```json
    {
    "serialNumber": 10,
    "task": "task9",
    "completed": false,
    "description": "",
    "edited": true,
    "createdDate": "2023-10-06T10:41:11.806Z",
    "modifiedDate": "2023-10-06T10:41:11.806Z",
    "lastViewed": true,
    "id": 7
}
    ```
    
5. Delete a todo item:
    
    ```bash
    curl -X DELETE http://localhost:8080/todos/{id}
    ```
    
    Response:
    
    ```json
   {
    "id": "7"
   }
    ```



