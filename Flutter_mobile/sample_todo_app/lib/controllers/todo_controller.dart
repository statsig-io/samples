import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/todo.dart';
import '../repositories/todo_repository.dart';

class TodoController {
  final ProviderRef ref;

  TodoController(this.ref);

  void addTodo(Todo todo) {
    ref.read(todoRepositoryProvider.notifier).postTodoEntry(todo);
  }

  void removeTodo(String id) {
    ref.read(todoRepositoryProvider.notifier).deleteTodo(id);
  }

  void editTodo(String id, String title) {
    ref.read(todoRepositoryProvider.notifier).editTodo(id, title);
  }

  void toggleTodo(Todo todo) {
    ref.read(todoRepositoryProvider.notifier).updateTodo(todo);
  }
}

final todoControllerProvider = Provider<TodoController>((ref) {
  return TodoController(ref);
});
