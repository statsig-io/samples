import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Task from "./Task";
import { Statsig } from "statsig-react";

type TodoListProps = {
  dataList: string[];
  deleteTodoFromList(itemAt: number, itemValue: string): void;
};

const TodoList = (props: TodoListProps) => {
  const TODO_LIST_VIEWED: string = "list_viewed";
  const TODO_DELETED: string = "todo_deleted";
  const [itemAt, setItemAt] = useState<number>(0);
  const [itemValue, setItemValue] = useState<any>();

  useEffect(() => {
    props.deleteTodoFromList(itemAt, itemValue);
  }, []);

  const deleteSingleTodo = (taskAt: number, item: any) => {
    setItemAt(taskAt);
    setItemValue(item);
    Statsig.logEvent(TODO_DELETED);
    props.deleteTodoFromList(taskAt, item);
  };

  const listItemAddedComponent = () => {
    if (props.dataList.length == 1) {
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
              text={item}
              itemAt={index}
              deleteTodoItem={(taskAt: number, text: string) =>
                deleteSingleTodo(taskAt, text)
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
