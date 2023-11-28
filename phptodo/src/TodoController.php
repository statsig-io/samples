<?php
class TodoController {
    private $repository;

    public function __construct($repository) {
        $this->repository = $repository;
    }

    public function getAllTodos() {
        $todos = $this->repository->getAllTodos();
        $this->sendJsonResponse($todos);
    }

    public function getTodoById($id) {
        $todo = $this->repository->getTodoById($id);
        if ($todo) {
            $this->sendJsonResponse($todo);
        } else {
            $this->notFound();
        }
    }

    public function createTodo() {
        $input = $this->getJsonInput();
        $this->repository->createTodo(
            $input['task'] ?? '',
            $input['description'] ?? '',
            $input['completed'] ?? false,
            $input['edited'] ?? false,
            $input['serialNumber'] ?? 0,
            $input['lastViewed'] ?? '',
            $input['createdDate'] ?? '',
            $input['modifiedDate'] ?? ''
        );
        $this->sendJsonResponse(['message' => 'Todo created']);
    }

    public function updateTodoById($id) {
        $input = $this->getJsonInput();
        $this->repository->updateTodo(
            $id,
            $input['task'] ?? '',
            $input['description'] ?? '',
            $input['completed'] ?? false,
            $input['edited'] ?? false,
            $input['serialNumber'] ?? 0,
            $input['lastViewed'] ?? '',
            $input['createdDate'] ?? '',
            $input['modifiedDate'] ?? ''
        );
        $this->sendJsonResponse(['message' => 'Todo updated']);
    }

    public function deleteTodoById($id) {
        $this->repository->deleteTodo($id);
        $this->sendJsonResponse(['message' => 'Todo deleted']);
    }

    public function sendJsonResponse($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function getJsonInput() {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?? [];
    }

    public function notFound() {
        header('HTTP/1.1 404 Not Found');
        echo '404 Not Found';
    }
}
?>
