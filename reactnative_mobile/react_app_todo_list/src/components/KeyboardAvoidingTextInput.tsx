import { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";

type KeyboardAvoidingTextInputProps = {
  placeHolderText: string;
  taskValue: string;
  changeText: (text: string) => void;
  sortTodoList: () => void;
  addTask: (todoObj: TodoModel) => void;
};

const KeyboardAvoidingTextInput = (props: KeyboardAvoidingTextInputProps) => {
  const [taskDetail, setTaskDetail] = useState<any>();
  const [srNum, setSrNum] = useState<number>(1);
  const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

  const textChangeListener = (text: string) => {
    setTaskDetail(text);
    props.changeText(text);
  };

  const addTaskListener = (text: string) => {
    const todoObj: TodoModel = {
      id: 0,
      serialNumber: srNum,
      task: text,
      description: text,
      completed: false,
      edited: false,
      lastViewed: false,
      createdDate: getCurrentDateTime(),
      modifiedDate: getCurrentDateTime(),
    };
    setSrNum(srNum + 1);
    props.addTask(todoObj);
  };

  const getCurrentDateTime = () => new Date(moment().format(dateTimeFormat));

  const sortList = () => {
    props.sortTodoList();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput
        style={styles.input}
        placeholder={props.placeHolderText}
        value={props.taskValue}
        onChangeText={(text) => textChangeListener(text)}
      />

      <TouchableOpacity onPress={() => addTaskListener(taskDetail)}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sortList()}>
        <Image
          style={styles.imageBackground}
          source={require("../assets/refresh.png")}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  writeTaskWrapper: {
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 80,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginStart: 20,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  imageBackground: {
    width: 10,
    height: 20,
    padding: 11,
    marginEnd: 20,
  },
  addText: {},
});

export default KeyboardAvoidingTextInput;
