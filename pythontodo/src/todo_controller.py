from flask import Flask, jsonify, request
from todo_repository import TodoRepository
from flask_cors import CORS
import util
import constants

app = Flask(__name__)
CORS(app)

repository = TodoRepository()

@app.route('/todos', methods=['GET'])
def get_all_todos():
    todos = repository.get_all_todos()
    return jsonify([todo.getJson() for todo in todos])

@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    todo = repository.create_todo(data['task'], data['description'],data['completed'], data['edited'],data['createdDate'], data['modifiedDate'],data['lastViewed'],data['serialNumber'])
    util.logEvent(constants.TODO_CREATED)
    return jsonify(todo.getJson()), 201

@app.route('/todos/<todo_id>', methods=['GET'])
def get_todo_by_id(todo_id):
    todo = repository.get_todo_by_id(todo_id)
    if todo:
        return jsonify(todo.getJson())
    else:
        return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/', methods=['PUT'])
def update_todo_by_id():
    data = request.get_json()
    updated_todo = repository.update_todo_by_id(data['id'],data['task'], data['description'],data['completed'], data['edited'],data['createdDate'], data['modifiedDate'],data['lastViewed'],data['serialNumber'])
    util.logEvent(constants.TODO_EDITED)
    if updated_todo:
        return jsonify(updated_todo.getJson())
    else:
        return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo_by_id(todo_id):
    isDeleteEnable = util.isDeleteFeatureEnable()
    deleted_todo = repository.delete_todo_by_id(todo_id)
    if deleted_todo and isDeleteEnable:
        util.logEvent(constants.TODO_DELETED)
        return jsonify({"id":deleted_todo.id})
    else:
        return jsonify({'error': 'Todo not found'}), 404
