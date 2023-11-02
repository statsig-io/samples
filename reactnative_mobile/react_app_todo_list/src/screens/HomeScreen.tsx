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
import { useEffect, useState, useRef, memo } from "react";
import "react-native-get-random-values";
import TodoList from "../components/TodoList";
import KeyboardAvoidingTextInput from "../components/KeyboardAvoidingTextInput";
import useTodoService from "../components/TodoService";

const HomeScreen = () => {
  const appState = useRef(AppState.currentState);

  const [task, setTask] = useState<string>("");

  const API_KEY: string = REACT_APP_CLIENT_KEY || "";
  const [user, setUser] = useState({ userID: "reactnative_dummy_user_id" });
  const [statsigInitialized, setStatsigInitialized] = useState(false);
  const [bannerDynConf, setBannerDynConf] = useState(false);
  const [bannerWarningMsg, setBannerWarningMsg] = useState("");
  const [bannerWarningTextColor, setBannerWarningTextColor] = useState("");
  const [bannerWarningBdgColor, setBannerWarningBdgColor] = useState("");
  const TODO_CREATED: string = "CLIENT_TODO_CREATED";
  const APP_OPENED: string = "CLIENT_TODO_APP_OPENED";
  const APP_BACKGROUNDED: string = "CLIENT_TODO_APP_BACKGROUND";

  const baseTodoUrl = "http://localhost:8080/todos";
  const [todoList, setTodoList] = useState<TodoModel[]>([]);
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

  const handleAddTask = async (todoObj: TodoModel) => {
    Keyboard.dismiss();
    setTask("");
    Statsig.logEvent(TODO_CREATED);
    addTodoItem(todoObj);
    fetchTodoList();
  };

  const addTodoItem = async (todoObj: TodoModel) => {
    var addItem = await useTodoService(
      baseTodoUrl,
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      JSON.stringify({
        serialNumber: todoObj.serialNumber,
        task: todoObj.task,
        completed: todoObj.completed,
        description: todoObj.description,
        edited: todoObj.edited,
        createdDate: todoObj.createdDate,
        modifiedDate: todoObj.modifiedDate,
        lastViewed: todoObj.lastViewed,
      })
    );
    setLoading(addItem.loading);
    if (!addItem.loading) {
      if (addItem.error != "") {
        console.error(addItem.error);
      } else {
        fetchTodoList();
      }
    }
  };

  const fetchTodoList = async () => {
    if (todoList.length > 0) {
      setTodoList([]);
    }
    var fetchList = await useTodoService(baseTodoUrl, "GET", undefined, null);
    setLoading(fetchList.loading);
    if (!fetchList.loading) {
      if (fetchList.error != "") {
        console.error(fetchList.error);
      } else {
        setTodoList(fetchList.data);
      }
    }
  };

  const deleteTodoItem = async (itemId: number) => {
    var deleteItem = await useTodoService(
      baseTodoUrl + "/" + itemId,
      "DELETE",
      undefined,
      null
    );
    setLoading(deleteItem.loading);
    if (!deleteItem.loading) {
      if (deleteItem.error != "") {
        console.error(deleteItem.error);
      } else {
        fetchTodoList();
      }
    }
  };

  const completeTask = async (todoObj: TodoModel) => {
    var completeItem = await useTodoService(
      baseTodoUrl,
      "PUT",
      {
        "Content-Type": "application/json",
      },
      JSON.stringify({
        serialNumber: todoObj.serialNumber,
        task: todoObj.task,
        completed: todoObj.completed,
        description: todoObj.description,
        edited: todoObj.edited,
        createdDate: todoObj.createdDate,
        modifiedDate: todoObj.modifiedDate,
        lastViewed: todoObj.lastViewed,
      })
    );
    setLoading(completeItem.loading);
    if (!completeItem.loading) {
      if (completeItem.error != "") {
        console.error(completeItem.error);
      } else {
        fetchTodoList();
      }
    }
  };

  const arrangeTodoList = async () => {
    await fetchTodoList();
    const dynamicConfig: number = Statsig.getConfig("item_sorting").get(
      "sort_order",
      0
    );
    if (dynamicConfig === 1) {
      const numAscending = [...todoList].sort(
        (a, b) =>
          getDateTimeInMillie(a.createdDate) -
          getDateTimeInMillie(b.createdDate)
      );
      setTodoList(numAscending);
    } else if (dynamicConfig === 2) {
      const numDescending = [...todoList].sort(
        (a, b) =>
          getDateTimeInMillie(b.createdDate) -
          getDateTimeInMillie(a.createdDate)
      );
      setTodoList(numDescending);
    } else if (dynamicConfig === 3) {
      const strAscending = [...todoList].sort((a, b) =>
        a.task > b.task ? 1 : -1
      );
      setTodoList(strAscending);
    }
  };

  const getDateTimeInMillie = (date: Date): number => {
    const dateValue = new Date(date);
    return dateValue.getMilliseconds();
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
      {bannerDynConf ? (
        <View style={styles.bannerWarningContainer}>
          <Text
            style={{
              fontSize: 20,
              color:
                bannerWarningTextColor != "" ? bannerWarningTextColor : "black",
              backgroundColor:
                bannerWarningBdgColor != "" ? bannerWarningBdgColor : "white",
            }}
          >
            {bannerWarningMsg}
          </Text>
        </View>
      ) : null}
      <StatsigProvider
        sdkKey={API_KEY}
        user={user}
        waitForInitialization={true}
        options={{
          initCompletionCallback: initCallback,
        }}
      >
        {statsigInitialized ? (
          <View style={styles.childContainer}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>

            <KeyboardAvoidingTextInput
              placeHolderText={"Write a task here"}
              changeText={(text: string) => setTask(text)}
              taskValue={task}
              addTask={(modelObj: TodoModel) => handleAddTask(modelObj)}
              sortTodoList={() => arrangeTodoList()}
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <TodoList
                dataList={todoList}
                deleteTodoFromList={(item: TodoModel) =>
                  deleteTodoItem(item.id)
                }
                completeTodoFromList={(item: TodoModel) => completeTask(item)}
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
        <View />
      </StatsigProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerWarningContainer: {
    flexDirection: "row",
    marginTop: 120,
  },
  childContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  sectionTitle: {
    flexWrap: "wrap",
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  errorSectionTitle: {
    fontSize: 20,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default memo(HomeScreen);
