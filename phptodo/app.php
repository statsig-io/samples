<?php 
require_once __DIR__ . '/vendor/autoload.php';

require __DIR__.'/src/TodoController.php';
require __DIR__.'/src/';



use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Selective\BasePath\BasePathMiddleware;



$app = AppFactory::create();

// // Add Slim routing middleware
// $app->addRoutingMiddleware();

// // Set the base path to run the app in a subdirectory.
// // This path is used in urlFor().
// $app->add(new BasePathMiddleware($app));

// $app->addErrorMiddleware(true, true, true);

// Create an instance of the TodoController
$repository = new TodoRepository();
$todoController = new TodoController($repository);

// Map the GET /todos endpoint to the getTodos method
$app->get('/todos', function (Request $request, Response $response, $args) use ($todoController) {

    $todos = $todoController->getAllTodos();
    print_r(json_encode($todos));

    return $response->getBody()->write(json_encode($todos));
});

// Map the GET /todos/{id} endpoint to the getTodoById method
$app->get('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
    $id = $args['id'];
    $todo = $todoController->getTodoById($id);
    return $response->getBody()->write(json_encode($todo));
});

// Map the POST /todos endpoint to the createTodo method
$app->post('/todos', function (Request $request, Response $response, $args) use ($todoController) {
   // print_r(json_encode($request));
    error_log("Todo post called ");
    $json_payload = json_decode($request->getBody());
    $log_message_temp = "JSON request data: " . print_r($json_payload, true);
    error_log($log_message_temp);

    $data = $request->getBody();
    $log_message = "POST request data: " . print_r($data, true);
    error_log($log_message);
    $todo = $todoController->createTodo($data);
    return $response->getBody()->write(json_encode($todo));
});

// Map the PUT /todos/{id} endpoint to the updateTodoById method
$app->put('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
    $id = $args['id'];
    $data = $request->getParsedBody();
    $todo = $todoController->updateTodoById($id, $data);
    return $response->getBody()->write(json_encode($todo));
});

// Map the DELETE /todos/{id} endpoint to the deleteTodoById method
$app->delete('/todos/{id}', function (Request $request, Response $response, $args) use ($todoController) {
    $id = $args['id'];
    $todoController->deleteTodoById($id);
    return $response->getBody()->write(json_encode(['id' => $id]));
});

// Run the Slim App
$app->run();

// try {
//     $app->run();     
// } catch (Exception $e) {    
//   // We display a error message
//   die( json_encode($e)); 
// }

?>