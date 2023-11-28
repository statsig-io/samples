import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:sample_todo_app/models/todo.dart';

class NetworkApi {
  final Uri requestUrlUri = Uri.parse("http://localhost:8080/todos");
  final Map<String, String> requestHeader = {
    "Accept": "application/json",
    "Content-type": "application/json"
  };

  Future<List<Todo>> fetchTodoList() async {
    http.Response res = await http.get(requestUrlUri);
    if (res.statusCode == 200) {
      List jsonResponse = json.decode(res.body);
      return jsonResponse.map((data) => Todo.fromJson(data)).toList();
    } else {
      throw "Unable to retrieve posts.";
    }
  }

  Future<http.Response?> postTodo(Todo todo) async {
    try {
      final requestBody = jsonEncode(todo.toMapJson());
      return await http.post(requestUrlUri,
          headers: requestHeader, body: requestBody);
    } catch (e, stacktrace) {
      return null;
    }
  }

  Future<http.Response?> updateTodo(Todo todo) async {
    try {
      final requestBody = jsonEncode(todo.toMapJson());
      return await http.put(requestUrlUri,
          headers: requestHeader, body: requestBody);
    } catch (e, stacktrace) {
      return null;
    }
  }

  Future<http.Response?> deleteTodo(String id) async {
    try {
      return await http.delete(
        Uri.parse("http://localhost:8080/todos/$id"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
    } catch (e, stacktrace) {
      return null;
    }
  }
}
