<?php
require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/TodoController.php';
require __DIR__ . '/src/TodoRepository.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\CorsMiddleware;

$app = AppFactory::create();
$repository = new TodoRepository();
$todoController = new TodoController($repository);

$app->add(new CorsMiddleware(
    [
        "origin" => ["*"],
        "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
        "headers.allow" => ["Authorization", "Content-Type"],
        "headers.expose" => [],
        "credentials" => true,
        "cache" => 0
    ]
));

$app->get('/todos', function (Request $request, Response $response, $args) use ($todoController) {

    $todos = $todoController->getAllTodos();
    $response->getBody()->write(json_encode($todos));
    $response = $response->withStatus(200, 'OK');
    return $response;
});

// Map the GET /todos/{id} endpoint to the getTodoById method
$app->get('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
    $id = $args['id'];
    $todo = $todoController->getTodoById($id);
    $response->getBody()->write(json_encode($todo));
    $response = $response->withStatus(200, 'OK');
    return $response;
});

// Map the POST /todos endpoint to the createTodo method
$app->post('/todos', function (Request $request, Response $response, $args) use ($todoController) {

    $data = $request->getBody();
    $todo = $todoController->createTodo($data);
    $response->getBody()->write(json_encode($todo));
    $response = $response->withStatus(200, 'OK');
    return $response->withHeader('Content-Type', 'application/json');
});

// Map the PUT /todos/{id} endpoint to the updateTodoById method
$app->put('/todos', function (Request $request, Response $response, $args) use ($todoController) {
    $data = $request->getBody();
    $todo = $todoController->updateTodoById($data);
    $response->getBody()->write(json_encode($todo));
    $response = $response->withStatus(201, 'OK');
    return $response;
});

// Map the DELETE /todos/{id} endpoint to the deleteTodoById method
$app->delete('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
    $id = $args['id'];
    $todoController->deleteTodoById($id);
    $response->getBody()->write(json_encode(['id' => $id]));
    $response = $response->withStatus(200, 'OK');
    return $response;
});

$app->run();
