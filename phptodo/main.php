<?php

require_once __DIR__ . '/vendor/autoload.php'; // path to installation folder

use Statsig\StatsigServer;
use Statsig\StatsigOptions;
use Statsig\Adapters\LocalFileDataAdapter;
use Statsig\Adapters\LocalFileLoggingAdapter;
use Statsig\StatsigUser;
use Statsig\StatsigEvent;



class Main {
    private $statsig;
    private $deleteFeature;
    private $user;
   

    public function __construct() {
        $config_adapter = new LocalFileDataAdapter();
        $logging_adapter = new LocalFileLoggingAdapter();
        $options = new StatsigOptions($config_adapter, $logging_adapter);
        $this->statsig = new StatsigServer("secret-9lbe9aax4FWPyJiLrKfo8GAj1cXX2UUqoDBcG4B7rKW", $options);
        $this->user = StatsigUser::withUserID("php_user");
        $this->user->setEmail("user_php@statsig.com");
        $this->user->setCountry("IN");

    }

    public function run() {
        // Main functionality of the application
        $config = $this->statsig->getConfig($this->user, "warning_banner");
       // error_log("The value of variable is: " . $config);
        print_r($config);
        $jsonString = json_encode($config);
        print_r($jsonString);


    }

    public function getExperiment(){
        $todo_experiment = $this->statsig->getExperiment($this->user, "item_sorting");
        print_r($todo_experiment);
        print_r($todo_experiment->getName());
        print_r($todo_experiment->getValue());

        $jsonString = json_encode($todo_experiment);
        print_r($jsonString);

    }

    public function logEvent(){
        $event = new StatsigEvent("TODO_CREATE");
        $event->setUser($this->user);
        $event->setValue("TODO");
        $event->setMetadata(array("title" => "TODO_1"));
        $this->statsig->logEvent($event);
    }

    public function flush(){
        $this->statsig->flush();
    }
}

$main = new Main();
$main->run();
$main->getExperiment();
$main->logEvent();
$main->flush();


?>