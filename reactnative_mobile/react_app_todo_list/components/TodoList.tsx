import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Task from "./Task";
import { Statsig } from "statsig-react";
import TODOModel from "../models/TODOModel";

type TodoListProps = {
  dataList: TODOModel[];
  deleteTodoFromList(itemAt: number, itemValue: TODOModel): void;
  completeTodoFromList(itemAt: number, itemValue: TODOModel): void;
};

const TodoList = (props: TodoListProps) => {
  const TODO_LIST_VIEWED: string = "CLIENT_TODO_LIST_VIEWED";
  const TODO_DELETED: string = "CLIENT_TODO_DELETED";
  const TODO_COMPLETED: string = "CLIENT_TODO_COMPLETED";
  const [itemAt, setItemAt] = useState<number>(0);
  const [itemValue, setItemValue] = useState<TODOModel>();

  useEffect(() => {
    if (itemValue != null) {
      props.deleteTodoFromList(itemAt, itemValue);
    }
  }, []);

  const deleteSingleTodo = (taskAt: number, item: TODOModel) => {
    setItemAt(taskAt);
    setItemValue(item);
    Statsig.logEvent(TODO_DELETED);
    props.deleteTodoFromList(taskAt, item);
  };

  const completeSingleTodo = (taskAt: number, item: TODOModel) => {
    setItemAt(taskAt);
    setItemValue(item);
    Statsig.logEvent(TODO_COMPLETED);
    props.completeTodoFromList(taskAt, item);
  };

  const listItemAddedComponent = () => {
    if (props.dataList != null && props.dataList.length == 1) {
      Statsig.logEvent(TODO_LIST_VIEWED);
    }
    return <View />;
  };

  return (
    <FlatList
      data={props.dataList}
      renderItem={({ item, index }) => (
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <Task
              taskData={item}
              itemAt={index}
              deleteTodoItem={(taskAt: number, modelObj: TODOModel) =>
                deleteSingleTodo(taskAt, modelObj)
              }
              completeTodoItem={(taskAt: number, modelObj: TODOModel) =>
                completeSingleTodo(taskAt, modelObj)
              }
            />
          </View>
        </View>
      )}
      ListFooterComponent={listItemAddedComponent}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  tasksWrapper: {
    paddingTop: 1,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 1,
  },
});

export default TodoList;
