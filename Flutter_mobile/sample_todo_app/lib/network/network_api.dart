import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:sample_todo_app/models/todo.dart';

class NetworkApi {
  final String baseURL = "http://192.168.0.101:8080/todos";

  Future<List<Todo>> fetchTodoList() async {
    http.Response res = await http.get(Uri.parse(baseURL));
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
      return await http.post(Uri.parse(baseURL),
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          body: requestBody);
    } catch (e, stacktrace) {
      return null;
    }
  }

  Future<void> updateTodo(Todo todo) async {
    try {
      final requestBody = jsonEncode(todo.toMapJson());
      await http.put(Uri.parse(baseURL),
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          body: requestBody);
    } catch (e, stacktrace) {}
  }
}
