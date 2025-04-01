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

export default getUsers;
