import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Backend ToDo List",
            version: "1.0.0",
            description:
                "Aplicación web de gestión de tareas desarrollada con MongoDB, Express, React y Node.js (Stack MERN) siguiendo el diseño provisto en Behance.",
            contact: {
                name: "Anthony Josue Escobar Ponce",
                email: "anthonyescobarponce@Outlook.com",
            },
        },
        servers: [
            {
                url: "https://node-js-to-do-list-backend.vercel.app/aeToDoList/v1",
            },
        ],
    },
    apis: [
        "../src/routes/task.routes.js"
    ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
