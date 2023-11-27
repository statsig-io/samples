import 'dart:convert';

class Todo {
  final String task;
  final String description;
  final int id;
  final DateTime createdDate;
  final DateTime modifiedDate;
  bool completed;
  bool edited;
  bool lastViewed;

  Todo({
    required this.task,
    required this.description,
    required this.id,
    required this.createdDate,
    required this.modifiedDate,
    this.completed = false,
    this.edited = false,
    this.lastViewed = false,
  });

  Todo copyWith({
    String? task,
    String? description,
    int? id,
    DateTime? createdDate,
    DateTime? modifiedDate,
    bool? completed,
    bool? edited,
    bool? lastViewed,
  }) {
    return Todo(
      task: task ?? this.task,
      description: description ?? this.description,
      id: id ?? this.id,
      createdDate: createdDate ?? this.createdDate,
      modifiedDate: modifiedDate ?? this.modifiedDate,
      completed: completed ?? this.completed,
      edited: edited ?? this.edited,
      lastViewed: lastViewed ?? this.lastViewed,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'task': task,
      'description': description,
      'id': id,
      'createdDate': createdDate.millisecondsSinceEpoch,
      'modifiedDate': modifiedDate.millisecondsSinceEpoch,
      'completed': completed,
      'edited': edited,
      'lastViewed': lastViewed,
    };
  }

  factory Todo.fromMap(Map<String, dynamic> map) {
    return Todo(
      task: map['task'] as String,
      description: map['description'] as String,
      id: map['id'] as int,
      createdDate: DateTime.fromMillisecondsSinceEpoch(map['createdDate'] as int),
      modifiedDate: DateTime.fromMillisecondsSinceEpoch(map['modifiedDate'] as int),
      completed: map['completed'] as bool,
      edited: map['edited'] as bool,
      lastViewed: map['lastViewed'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory Todo.fromJson(String source) =>
      Todo.fromMap(json.decode(source) as Map<String, dynamic>);
}
