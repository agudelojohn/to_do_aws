import AWS from "aws-sdk";
// Configurar AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Interfaz para definir la estructura de un usuario
interface User {
  id: string;
  nombre: string;
  address: string;
}

interface ToDoTask {
  id: string;
  creationDate: string;
  description: string;
  priority: number;
  userOwner: string;
}

// Función para obtener todos los usuarios de DynamoDB
const getUsers = async (): Promise<User[]> => {
  try {
    const params = {
      TableName: "usuarios",
    };

    const data = await dynamoDB.scan(params).promise();
    return data.Items as User[];
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

const getToDoTasks = async (): Promise<ToDoTask[]> => {
  try {
    const params = {
      TableName: "to_do_tasks",
    };
    const data = await dynamoDB.scan(params).promise();
    return data.Items as ToDoTask[];
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

export { getUsers, getToDoTasks };
