export default class TODOModel {
  id: number;
  serialNumber: number;
  task: string;
  description: string;
  completed: boolean;
  edited: boolean;
  lastViewed: boolean;
  createdDate: Date;
  modifiedDate: Date;

  constructor(
    id: number,
    serialNumber: number,
    task: string,
    description: string,
    completed: boolean,
    edited: boolean,
    lastViewed: boolean,
    createdDate: Date,
    modifiedDate: Date
  ) {
    this.id = id;
    this.serialNumber = serialNumber;
    this.task = task;
    this.description = description;
    this.completed = completed;
    this.edited = edited;
    this.lastViewed = lastViewed;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}
