import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:todo_app/screens/tasks/add_todo_screen.dart';
import 'package:todo_app/screens/tasks/tasks_screen.dart';

import '../models/todo.dart';
import '../screens/home_screen.dart';

enum AppRoute {
  homeScreen,
  addTodoScreen,
  tasksScreen,
}

final goRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/home',
    routes: [
      GoRoute(
        name: AppRoute.homeScreen.name,
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        name: AppRoute.tasksScreen.name,
        path: '/tasks',
        builder: (context, state) => const TasksScreen(),
        routes: [
          GoRoute(
            name: AppRoute.addTodoScreen.name,
            path: 'add-todo',
            builder: (context, state) {
              if (state.extra != null) {
                final todo = state.extra as Todo;
                return AddTodoScreen(
                  todo: todo,
                );
              }
              return const AddTodoScreen();
            },
          ),
        ],
      ),
    ],
  );
});
