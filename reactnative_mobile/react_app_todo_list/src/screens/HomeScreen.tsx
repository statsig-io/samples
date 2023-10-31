import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  AppState,
  ActivityIndicator,
} from "react-native";
import { StatsigProvider, Statsig } from "statsig-react";
import { REACT_APP_CLIENT_KEY } from "@env";
import { useEffect, useState, useRef, memo } from "react";
import "react-native-get-random-values";
import TodoList from "../components/TodoList";
import TODOModel from "../models/TODOModel";
import KeyboardAvoidingTextInput from "../components/KeyboardAvoidingTextInput";

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

  const handleAppStateChange = (nextAppState: any) => {
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

  const addNewTask = async (modelObj: TODOModel) => {
    Keyboard.dismiss();
    setTask("");
    Statsig.logEvent(TODO_CREATED);
    addTodoInList(modelObj);
    fetchTodoList();
  };

  const addTodoInList = async (modelObj: TODOModel) => {
    fetch(baseTodoUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serialNumber: modelObj.serialNumber,
        task: modelObj.task,
        completed: modelObj.completed,
        description: modelObj.description,
        edited: modelObj.edited,
        createdDate: modelObj.createdDate,
        modifiedDate: modelObj.modifiedDate,
        lastViewed: modelObj.lastViewed,
      }),
    })
      .then((response) => {})
      .catch((err) => console.error(err));
  };

  const fetchTodoList = async () => {
    if (todoList.length > 0) {
      setTodoList([]);
    }
    fetch(baseTodoUrl)
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const deleteTask = (item: TODOModel) => {
    fetch(baseTodoUrl + "/" + item.id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => fetchTodoList())
      .catch((err) => console.error(err));
  };

  const completeTask = (modelObj: TODOModel) => {
    fetch(baseTodoUrl, {
      method: "PUT",
      body: JSON.stringify({
        serialNumber: modelObj.serialNumber,
        task: modelObj.task,
        completed: modelObj.completed,
        description: modelObj.description,
        edited: true,
        createdDate: modelObj.createdDate,
        modifiedDate: modelObj.modifiedDate,
        lastViewed: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => fetchTodoList())
      .catch((err) => console.error(err));
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
    fetchBannerWarning();
  };

  const getDateTimeInMillie = (date: Date): number => {
    const dateValue = new Date(date);
    return dateValue.getMilliseconds();
  };

  const fetchBannerWarning = () => {
    if (statsigInitialized) {
      const bannerConf = Statsig.getConfig("warning_banner");
      setBannerDynConf(bannerConf != null);
      setBannerWarningMsg(bannerConf.get("message", "NA"));
      setBannerWarningTextColor(bannerConf.get("textColor", "white"));
      setBannerWarningBdgColor(bannerConf.get("backgroundColor", "white"));
    }
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
              addTask={(modelObj: TODOModel) => addNewTask(modelObj)}
              sortTodoList={() => arrangeTodoList()}
            />

            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <TodoList
                dataList={todoList}
                deleteTodoFromList={(index: any, item: TODOModel) =>
                  deleteTask(item)
                }
                completeTodoFromList={(index: any, item: TODOModel) =>
                  completeTask(item)
                }
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
