from flask import Flask, jsonify, request
from todo_repository import TodoRepository

app = Flask(__name__)
repository = TodoRepository()

@app.route('/todos', methods=['GET'])
def get_all_todos():
    todos = repository.get_all_todos()
    return jsonify([todo.__dict__ for todo in todos])

@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    print(data)
    todo = repository.create_todo(data['task'], data['description'],data['completed'], data['edited'],data['createdDate'], data['modifiedDate'],data['lastViewed'],data['serialNumber'])
    print(todo)
    return jsonify(todo.__dict__), 201

@app.route('/todos/<todo_id>', methods=['GET'])
def get_todo_by_id(todo_id):
    todo = repository.get_todo_by_id(todo_id)
    if todo:
        return jsonify(todo.__dict__)
    else:
        return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/', methods=['PUT'])
def update_todo_by_id():
    data = request.get_json()
    updated_todo = repository.update_todo_by_id(data['id'],data['task'], data['description'],data['completed'], data['edited'],data['createdDate'], data['modifiedDate'],data['lastViewed'],data['serialNumber'])

    if updated_todo:
        return jsonify(updated_todo.__dict__)
    else:
        return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo_by_id(todo_id):
    deleted_todo = repository.delete_todo_by_id(todo_id)
    if deleted_todo:
        return jsonify(deleted_todo.__dict__)
    else:
        return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
