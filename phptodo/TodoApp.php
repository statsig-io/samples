<?php
require_once __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/TodoController.php';
require __DIR__ . '/src/TodoRepository.php';
require __DIR__ . '/Util.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tuupola\Middleware\CorsMiddleware;


class TodoApp
{
    private $app;
    private $util;

    public function __construct()
    {
        $this->app = AppFactory::create();
        $this->util = new Util();

        $repository = new TodoRepository();
        $todoController = new TodoController($repository);

        $this->app->add(new CorsMiddleware(
            [
                "origin" => ["*"],
                "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
                "headers.allow" => ["Authorization", "Content-Type"],
                "headers.expose" => [],
                "credentials" => true,
                "cache" => 0
            ]
        ));

        $this->app->get('/todos', function (Request $request, Response $response, $args) use ($todoController) {

            $todos = $todoController->getAllTodos();
            $response->getBody()->write(json_encode($todos));
            $response = $response->withStatus(200, 'OK');
            return $response;
        });

        // Map the GET /todos/{id} endpoint to the getTodoById method
        $this->app->get('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
            $id = $args['id'];
            $todo = $todoController->getTodoById($id);
            $response->getBody()->write(json_encode($todo));
            $response = $response->withStatus(200, 'OK');
            return $response;
        });

        // Map the POST /todos endpoint to the createTodo method
        $this->app->post('/todos', function (Request $request, Response $response, $args) use ($todoController) {

            $data = $request->getBody();
            $todo = $todoController->createTodo($data);
            $response->getBody()->write(json_encode($todo));
            $response = $response->withStatus(200, 'OK');
            return $response->withHeader('Content-Type', 'application/json');
        });

        // Map the PUT /todos/{id} endpoint to the updateTodoById method
        $this->app->put('/todos', function (Request $request, Response $response, $args) use ($todoController) {
            $data = $request->getBody();
            $todo = $todoController->updateTodoById($data);
            $response->getBody()->write(json_encode($todo));
            $response = $response->withStatus(201, 'OK');
            return $response;
        });

        // Map the DELETE /todos/{id} endpoint to the deleteTodoById method
        $this->app->delete('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
            $id = $args['id'];
            $todoController->deleteTodoById($id);
            $response->getBody()->write(json_encode(['id' => $id]));
            $response = $response->withStatus(200, 'OK');
            return $response;
        });
    }

    public function run()
    {
        $this->app->run();
        $this->util->logEvent();
    }
}

$todoApp = new TodoApp();

// Run the application
$todoApp->run();
