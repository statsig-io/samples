from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import create_engine


created_date_str = '2023-10-06T10:41:11.806Z'
modified_date_str = '2023-10-06T10:41:11.806Z'

datetime_str = '2023-10-06T10:41:11.806Z'
datetime_obj = datetime.fromisoformat(datetime_str[:-1])



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
    createdDate = Column(DateTime)
    modifiedDate = Column(DateTime)
    
    engine = create_engine('sqlite:///todos.db')
    Base.metadata.create_all(engine)


    
    def __init__(self, task, description, completed, edited, createdDate, modifiedDate, lastViewed,serialNumber):
        self.task = task
        self.description = description
        self.completed = completed
        self.edited = edited
        createdDate=datetime.strptime(createdDate[:-1], '%Y-%m-%dT%H:%M:%S.%f'),
        modifiedDate=datetime.strptime(modifiedDate[:-1], '%Y-%m-%dT%H:%M:%S.%f'),
        self.lastViewed = lastViewed
        self.serialNumber = serialNumber

