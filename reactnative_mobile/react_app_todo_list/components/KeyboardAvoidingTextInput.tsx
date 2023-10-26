import { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TODOModel from "../models/TODOModel";
import moment from "moment";

type KeyboardAvoidingTextInputProps = {
  placeHolderText: string;
  taskValue: string;
  changeText: (text: string) => void;
  addTask: (modelObj: TODOModel) => void;
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
    const modelObj = new TODOModel(
      0,
      srNum,
      text,
      text,
      false,
      false,
      false,
      getCurrentDateTime(),
      getCurrentDateTime()
    );
    setSrNum(srNum + 1);
    props.addTask(modelObj);
  };

  const getCurrentDateTime = () => new Date(moment().format(dateTimeFormat));

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
  addText: {},
});

export default KeyboardAvoidingTextInput;
