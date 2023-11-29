<?php
class Todo
{
  public $id;
  public $task;
  public $description;
  public $completed;
  public $edited;
  public $serialNumber;
  public $lastViewed;
  public $createdDate;
  public $modifiedDate;

  public function __construct($id, $task, $description, $completed, $edited, $serialNumber, $lastViewed, $createdDate, $modifiedDate)
  {
    $this->id = $id;
    $this->task = $task;
    $this->description = $description;
    $this->completed = $completed;
    $this->edited = $edited;
    $this->serialNumber = $serialNumber;
    $this->lastViewed = $lastViewed;
    $this->createdDate = $createdDate;
    $this->modifiedDate = $modifiedDate;
  }
}
