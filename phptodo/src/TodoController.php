<?php
class TodoController
{
    private $repository;

    public function __construct($repository)
    {
        $this->repository = $repository;
    }

    public function getAllTodos()
    {
        $todos = $this->repository->getAllTodos();
        return $todos;
    }

    public function getTodoById($id)
    {
        $todo = $this->repository->getTodoById($id);
        if ($todo) {
            return  $todo;
        }
        return  $this->notFound();
    }

    public function createTodo()
    {
        $input = $this->getJsonInput();
        $todo =  $this->repository->createTodo(
            $input['task'] ?? '',
            $input['description'] ?? '',
            $input['completed'] ?? false,
            $input['edited'] ?? false,
            $input['serialNumber'] ?? 0,
            $input['lastViewed'] ?? '',
            $input['createdDate'] ?? '',
            $input['modifiedDate'] ?? ''
        );
        return $todo;
    }

    public function updateTodoById()
    {
        $input = $this->getJsonInput();
        $todo =  $this->repository->updateTodo(
            $input['id'] ?? 0,
            $input['task'] ?? '',
            $input['description'] ?? '',
            $input['completed'] ?? false,
            $input['edited'] ?? false,
            $input['serialNumber'] ?? 0,
            $input['lastViewed'] ?? '',
            $input['createdDate'] ?? '',
            $input['modifiedDate'] ?? ''
        );
        return $todo;
    }

    public function deleteTodoById($id)
    {
        $this->repository->deleteTodo($id);
        return ['id' => $id];
    }

    public function sendJsonResponse($data)
    {
        header('Content-Type: application/json');
        return json_encode($data);
    }

    public function getJsonInput()
    {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?? [];
    }

    public function notFound()
    {
        header('HTTP/1.1 404 Not Found');
        echo '404 Not Found';
    }
}
