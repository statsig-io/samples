import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  AppState,
  ActivityIndicator,
  AppStateStatus,
} from "react-native";
import { StatsigProvider, Statsig } from "statsig-react";
import { REACT_APP_CLIENT_KEY } from "@env";
import { useEffect, useState, useRef } from "react";
import "react-native-get-random-values";
import KeyboardAvoidingTextInput from "./components/KeyboardAvoidingTextInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [task, setTask] = useState<string>("");

  const [user, setUser] = useState({ userID: "reactnative_dummy_user_id" });
  const API_KEY = REACT_APP_CLIENT_KEY || "";
  const [statsigInitialized, setStatsigInitialized] = useState(false);

  const TODO_CREATED = "CLIENT_TODO_CREATED";
  const APP_OPENED = "CLIENT_TODO_APP_OPENED";
  const APP_BACKGROUNDED = "CLIENT_TODO_APP_BACKGROUND";

  const appState = useRef(AppState.currentState);

  const baseTodoUrl = "http://localhost:8080/todos";
  const [todoList, setTodoList] = useState<TODOModel[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodoList();
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Statsig.logEvent(APP_OPENED);
    } else {
      Statsig.logEvent(APP_BACKGROUNDED);
    }
    appState.current = nextAppState;
  };

  const handleAddTask = async (todoObj: TODOModel) => {
    Keyboard.dismiss();
    setTask("");
    Statsig.logEvent(TODO_CREATED);
    addTodoInList(todoObj);
    fetchTodoList();
  };

  const addTodoInList = async (todoObj: TODOModel) => {
    fetch(baseTodoUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serialNumber: todoObj.serialNumber,
        task: todoObj.task,
        completed: todoObj.completed,
        description: todoObj.description,
        edited: todoObj.edited,
        createdDate: todoObj.createdDate,
        modifiedDate: todoObj.modifiedDate,
        lastViewed: todoObj.lastViewed,
      }),
    })
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchTodoList = async () => {
    if (todoList.length > 0) {
      setTodoList([]);
    }
    try {
      const response = await fetch(baseTodoUrl);
      const json = await response.json();
      setTodoList(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = (item: TODOModel) => {
    const url = baseTodoUrl + "/" + item.id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchTodoList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const completeTask = (todoObj: TODOModel) => {
    fetch(baseTodoUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serialNumber: todoObj.serialNumber,
        task: todoObj.task,
        completed: todoObj.completed,
        description: todoObj.description,
        edited: todoObj.edited,
        createdDate: todoObj.createdDate,
        modifiedDate: todoObj.modifiedDate,
        lastViewed: todoObj.lastViewed,
      }),
    })
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });
    fetchTodoList();
  };

  const initCallback = (
    initDurationMs: number,
    success: boolean,
    message: string | null
  ) => {
    setStatsigInitialized(success);
  };

  return (
    <View style={styles.container}>
      <StatsigProvider
        sdkKey={API_KEY}
        user={user}
        waitForInitialization={true}
        options={{
          initCompletionCallback: initCallback,
        }}
      >
        <View />
      </StatsigProvider>
      {statsigInitialized ? (
        <View style={styles.childContainer}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <KeyboardAvoidingTextInput
            placeHolderText={"Write a task here"}
            changeText={(text: string) => setTask(text)}
            taskValue={task}
            addTask={(todoObj: TODOModel) => handleAddTask(todoObj)}
          />

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <TodoList
              dataList={todoList}
              deleteTodoFromList={(item: TODOModel) => deleteTask(item)}
              completeTodoFromList={(item: TODOModel) => completeTask(item)}
            />
          )}
        </View>
      ) : (
        <View style={styles.childContainer}>
          <Text style={styles.errorSectionTitle}>
            Statsig SDK not initialized. Please try reopening the application.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  childContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorSectionTitle: {
    fontSize: 20,
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
