import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/todo.dart';
import '../network/network_api.dart';

class TodoRepository extends StateNotifier<List<Todo>> {
  TodoRepository() : super([]) {
    loadTodos();
  }

  Future<void> loadTodos() async {
    final todoList = await fetchTodoList();
    state = todoList;
  }

  Future<void> saveTodos(List<Todo> todos) async {
    final prefs = await SharedPreferences.getInstance();
    final encodedTodos =
        jsonEncode(todos.map((todo) => todo.toJson()).toList());
    await prefs.setString('todos', encodedTodos);
  }

  Future<void> postTodoEntry(Todo todo) async {
    var response = await NetworkApi().postTodo(todo);
    if (response != null && response.statusCode == 200) {
      loadTodos();
    }
  }

  Future<List<Todo>> fetchTodoList() async {
    List<Todo> fetchedTodoList = await NetworkApi().fetchTodoList();
    return fetchedTodoList;
  }

  Future<void> updateTodo(Todo todo) async {
    var response = await NetworkApi().updateTodo(todo);
    if (response != null && response.statusCode == 200) {
      loadTodos();
    }
  }

  @override
  set state(List<Todo> newState) {
    super.state = newState;
    saveTodos(newState);
  }

  void addTodo(Todo todo) {
    state = [todo, ...state];
  }

  void removeTodo(String id) {
    state = [
      for (final todo in state)
        if (todo.id != int.parse(id)) todo
    ];
  }

  void editTodo(String id, String title) {
    state = [
      for (final todo in state)
        if (todo.id == int.parse(id)) todo.copyWith(task: title) else todo
    ];
  }

  void toggleTodo(String id) {
    state = [
      for (final todo in state)
        if (todo.id == int.parse(id))
          todo.copyWith(completed: !todo.completed)
        else
          todo
    ];
  }
}

final todoRepositoryProvider =
    StateNotifierProvider<TodoRepository, List<Todo>>((ref) {
  return TodoRepository();
});

final allTodoProvider = Provider<List<Todo>>((ref) {
  return ref.watch(todoRepositoryProvider);
});
