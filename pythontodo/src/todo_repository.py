from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from todo import Todo
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TodoRepository:      
    
    def __init__(self):
        engine = create_engine('sqlite:///todos.db')
        Base.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        self.session = Session()
          

    def get_all_todos(self):
        return self.session.query(Todo).all()

    def get_todo_by_id(self, todo_id):
        return self.session.query(Todo).filter_by(id=todo_id).first()

    def create_todo(self, task, description,completed, edited,createdDate, modifiedDate,lastViewed,serialNumber):
        todo = Todo(task, description,completed, edited,createdDate, modifiedDate,lastViewed,serialNumber)
        self.session.add(todo)
        self.session.commit()
        return todo

    def update_todo_by_id(self, todo_id, task, description,completed, edited,createdDate, modifiedDate,lastViewed,serialNumber):
        todo = self.session.query(Todo).filter_by(id=todo_id).first()
        if todo:
            todo.task = task
            todo.description = description
            todo.completed = completed
            todo.edited = edited
            todo.createdDate = createdDate
            todo.modifiedDate = modifiedDate
            todo.lastViewed = lastViewed
            todo.serialNumber = serialNumber    
            self.session.commit()
        return todo

    def delete_todo_by_id(self, todo_id):
        todo = self.session.query(Todo).filter_by(id=todo_id).first()
        if todo:
            self.session.delete(todo)
            self.session.commit()
        return todo
