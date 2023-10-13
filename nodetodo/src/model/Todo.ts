export interface Todo {
  id: number;
  task: string;
  description: string;
  completed: boolean;
  edited: boolean;
  isEditing: boolean;
  serialNumber: number;
  lastViewed: boolean;
  createdDate: Date;
  modifiedDate: Date;
}