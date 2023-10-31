import { TODOType } from "./AppDtos/DTOS";

export const BASE_LOCAL_URL = "http://localhost:8080/todos";

/**
 * To get the todo items
 */
export const getAllTodos = () => {
  return new Promise<any>((resolve, reject) => {
    fetch(BASE_LOCAL_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(`Get all todos response : ${JSON.stringify(data)}`);
        resolve(data);
      })
      .catch((error) => {
        console.error(`Get all todos error: ${error}`);
        reject(error);
      });
  });
};

/**
 * To create a TODO, by removing the unwanted fields
 * @param todoData
 * @returns
 */
export const postTodo = (todoData: TODOType) => {
  delete todoData.id;
  delete todoData.isEditing;

  console.log(`Post request: ${JSON.stringify(todoData)}`);

  return new Promise<any>((resolve, reject) => {
    fetch(BASE_LOCAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Post response: ${JSON.stringify(data)}`);
        resolve(data);
      })
      .catch((error) => {
        console.error(`Post error: ${error}`);
        reject(error);
      });
  });
};

/**
 * After edit update the todo
 * @param todoData
 * @returns
 */
export const updateTodo = (todoData: TODOType) => {
  return new Promise<any>((resolve, reject) => {
    fetch(BASE_LOCAL_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Update response: ${JSON.stringify(data)}`);
        resolve(data);
      })
      .catch((error) => {
        console.error(`Update error: ${error}`);
        reject(error);
      });
  });
};

/**
 * Get todo by ID
 * @param id
 * @returns
 */
export const getTodoById = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    fetch(BASE_LOCAL_URL + `/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Get TODO by ID response: ${JSON.stringify(data)}`);
        resolve(data);
      })
      .catch((error) => {
        console.error(`Get TODO by ID error: ${error}`);
        reject(error);
      });
  });
};

/**
 * Delete todo by ID
 * @param id
 * @returns
 */
export const deleteTodoById = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    fetch(BASE_LOCAL_URL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Delete TODO by ID response: ${JSON.stringify(data)}`);
        if (data && data.error) {
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        console.error(`Delete todo error: ${error}`);
        reject(error);
      });
  });
};
