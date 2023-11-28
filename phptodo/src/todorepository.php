<?php

class TodoRepository {
    private $filePath = 'todos.json';


    public function __construct() {
        if (!file_exists($this->filePath)) {
            touch($this->filePath);
            // Optionally, you can set file permissions using chmod()
            // chmod($filePath, 0644);
        }
        
    }

    public function getAllTodos() {
        $todos = json_decode(file_get_contents($this->filePath), true);
        return $todos;
    }

    public function getTodoById($id) {
        $todos = json_decode(file_get_contents($this->filePath), true);
        foreach ($todos as $todo) {
            if ($todo['id'] == $id) {
                return $todo;
            }
        }
        return null;
    }

    public function createTodo($task, $description, $completed, $edited, $serialNumber, $lastViewed, $createdDate, $modifiedDate) {
        $todos = json_decode(file_get_contents($this->filePath), true);
        $count = count($todos ?? []);
       
        $newTodo = [
            'id' => $count + 1,
            'task' => $task,
            'description' => $description,
            'completed' => $completed,
            'edited' => $edited,
            'serialNumber' => $serialNumber,
            'lastViewed' => $lastViewed,
            'createdDate' => $createdDate,
            'modifiedDate' => $modifiedDate
        ];
        $todos[] = $newTodo;
        file_put_contents($this->filePath, json_encode($todos));
    }

    public function updateTodo($id, $task, $description, $completed, $edited, $serialNumber, $lastViewed, $createdDate, $modifiedDate) {
        $todos = json_decode(file_get_contents($this->filePath), true);
        foreach ($todos as &$todo) {
            if ($todo['id'] == $id) {
                $todo['task'] = $task;
                $todo['description'] = $description;
                $todo['completed'] = $completed;
                $todo['edited'] = $edited;
                $todo['serialNumber'] = $serialNumber;
                $todo['lastViewed'] = $lastViewed;
                $todo['createdDate'] = $createdDate;
                $todo['modifiedDate'] = $modifiedDate;
                break;
            }
        }
        file_put_contents($this->filePath, json_encode($todos));
    }

    public function deleteTodo($id) {
        $todos = json_decode(file_get_contents($this->filePath), true);
        foreach ($todos as $key => $todo) {
            if ($todo['id'] == $id) {
                unset($todos[$key]);
                break;
            }
        }
        file_put_contents($this->filePath, json_encode(array_values($todos)));
    }
}
?>
