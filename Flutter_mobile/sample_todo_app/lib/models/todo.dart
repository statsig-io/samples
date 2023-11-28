class Todo {
  final int id;
  final int serialNumber;
  final String task;
  final String description;
  final DateTime createdDate;
  final DateTime modifiedDate;
  bool completed;
  bool edited;
  bool lastViewed;

  Todo({
    required this.id,
    required this.serialNumber,
    required this.task,
    required this.description,
    required this.createdDate,
    required this.modifiedDate,
    this.completed = false,
    this.edited = false,
    this.lastViewed = false,
  });

  Todo copyWith({
    int? id,
    int? serialNumber,
    String? task,
    String? description,
    DateTime? createdDate,
    DateTime? modifiedDate,
    bool? completed,
    bool? edited,
    bool? lastViewed,
  }) {
    return Todo(
      id: id ?? this.id,
      serialNumber: serialNumber ?? this.serialNumber,
      task: task ?? this.task,
      description: description ?? this.description,
      createdDate: createdDate ?? this.createdDate,
      modifiedDate: modifiedDate ?? this.modifiedDate,
      completed: completed ?? this.completed,
      edited: edited ?? this.edited,
      lastViewed: lastViewed ?? this.lastViewed,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'serialNumber': serialNumber,
      'task': task,
      'description': description,
      'createdDate': createdDate.toIso8601String(),
      'modifiedDate': modifiedDate.toIso8601String(),
      'completed': completed,
      'edited': edited,
      'lastViewed': lastViewed,
    };
  }

  factory Todo.fromMap(Map<String, dynamic> map) {
    return Todo(
      id: map['id'] as int,
      serialNumber: map['serialNumber'] as int,
      task: map['task'] as String,
      description: map['description'] as String,
      createdDate: DateTime.parse(map['createdDate']),
      modifiedDate: DateTime.parse(map['modifiedDate']),
      completed: map['completed'] as bool,
      edited: map['edited'] as bool,
      lastViewed: map['lastViewed'] as bool,
    );
  }

  Map toJson() => {
        'id': id,
        'serialNumber': serialNumber,
        'task': task,
        'description': description,
        'createdDate': createdDate.toIso8601String(),
        'modifiedDate': modifiedDate.toIso8601String(),
        'completed': completed,
        'edited': edited,
        'lastViewed': lastViewed,
      };

  Map<String, dynamic> toMapJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['serialNumber'] = serialNumber;
    data['task'] = task;
    data['description'] = description;
    data['modifiedDate'] = modifiedDate.toIso8601String();
    data['createdDate'] = createdDate.toIso8601String();
    data['completed'] = completed;
    data['edited'] = edited;
    data['lastViewed'] = lastViewed;
    return data;
  }

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'] as int,
      serialNumber: json['serialNumber'] as int,
      task: json['task'] as String,
      description: json['description'] as String,
      createdDate: DateTime.parse(json['createdDate']),
      modifiedDate: DateTime.parse(json['modifiedDate']),
      completed: json['completed'] as bool,
      edited: json['edited'] as bool,
      lastViewed: json['lastViewed'] as bool,
    );
  }
}
