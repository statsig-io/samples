import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Task from "./Task";
import { Statsig } from "statsig-react";

type TodoListProps = {
  dataList: TODOModel[];
  deleteTodoFromList(itemValue: TODOModel): void;
  completeTodoFromList(itemValue: TODOModel): void;
};

const TodoList = (props: TodoListProps) => {
  const TODO_LIST_VIEWED = "CLIENT_TODO_LIST_VIEWED";
  const TODO_DELETED = "CLIENT_TODO_DELETED";
  const TODO_COMPLETED = "CLIENT_TODO_COMPLETED";
  const [itemAt, setItemAt] = useState<number>(0);
  const [itemValue, setItemValue] = useState<TODOModel>();

  useEffect(() => {
    if (itemValue != null) {
      props.deleteTodoFromList(itemValue);
    }
  }, []);

  const deleteSingleTodo = (taskAt: number, item: TODOModel) => {
    setItemAt(taskAt);
    setItemValue(item);
    Statsig.logEvent(TODO_DELETED);
    props.deleteTodoFromList(item);
  };

  const completeSingleTodo = (taskAt: number, item: TODOModel) => {
    setItemAt(taskAt);
    setItemValue(item);
    Statsig.logEvent(TODO_COMPLETED);
    props.completeTodoFromList(item);
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
              deleteTodoItem={(taskAt: number, todoObj: TODOModel) =>
                deleteSingleTodo(taskAt, todoObj)
              }
              completeTodoItem={(taskAt: number, todoObj: TODOModel) =>
                completeSingleTodo(taskAt, todoObj)
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
