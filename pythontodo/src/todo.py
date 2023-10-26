from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


Base = declarative_base()

class Todo(Base):
    __tablename__ = 'todos'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    task = Column(String)
    description = Column(String)
    completed = Column(Boolean)
    edited = Column(Boolean)
    serialNumber = Column(Integer)
    lastViewed = Column(Boolean)
    createdDate = Column(String)
    modifiedDate = Column(String)
    

    
    def __init__(self, task, description, completed, edited, createdDate, modifiedDate, lastViewed,serialNumber):
        self.task = task
        self.description = description
        self.completed = completed
        self.edited = edited
        self.createdDate=createdDate
        self.modifiedDate=modifiedDate
        self.lastViewed = lastViewed
        self.serialNumber = serialNumber
        
        engine = create_engine('sqlite:///todos.db')
        Base.metadata.create_all(engine)
        Session = sessionmaker(bind=engine)
        self.session = Session()
        
    
    def __str__(self):
       todo_dict = self.__dict__.copy()
       todo_dict.pop('_sa_instance_state', None)
       return str(todo_dict)
   
    def getJson(self):
        return {'serialNumber': self.serialNumber, 
                 'id':self.id,
                'task': self.task, 
                'completed': self.completed, 
                'description': self.description, 
                'edited': self.edited,
                'createdDate': self.createdDate,
                'modifiedDate': self.modifiedDate, 
                'lastViewed': self.lastViewed}