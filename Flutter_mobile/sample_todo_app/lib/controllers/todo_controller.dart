import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../models/todo.dart';
import '../network/network_api.dart';
import '../repositories/todo_repository.dart';

class TodoController {
  final ProviderRef ref;

  TodoController(this.ref);

  List<Todo> getTodos() {
    List<Todo> todos = ref.watch(todoRepositoryProvider);
    return todos;
  }

  void addTodo(String title) {
    if (title == '') {
      return;
    }
    final formattedDate =
        DateFormat('yyyy-mm-dd hh:mm:ss').format(DateTime.now());
    final formattedDateObj = DateTime.parse(formattedDate);
    final todo = Todo(
        task: title,
        description: title,
        id: formattedDateObj.millisecondsSinceEpoch,
        createdDate: formattedDateObj,
        modifiedDate: formattedDateObj);

    print("time $formattedDate formattedDateObj $formattedDateObj "
        "todo id ${todo.id} task ${todo.task} "
        "mod date${todo.modifiedDate} "
        "created date ${todo.createdDate} "
        "Epoch milli ${DateTime.parse(formattedDate).millisecondsSinceEpoch}");

    NetworkApi().postTodo(todo);
    ref.read(todoRepositoryProvider.notifier).fetchTodoList();
    //ref.read(todoRepositoryProvider.notifier).addTodo(todo);


  }

  void removeTodo(String id) {
    ref.read(todoRepositoryProvider.notifier).removeTodo(id);
  }

  void editTodo(String id, String title) {
    ref.read(todoRepositoryProvider.notifier).editTodo(id, title);
  }

  void toggleTodo(String id) {
    ref.read(todoRepositoryProvider.notifier).toggleTodo(id);
  }
}

final todoControllerProvider = Provider<TodoController>((ref) {
  return TodoController(ref);
});
