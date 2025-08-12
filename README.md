# 📝ToDo-List_API-WEB
Aplicación web de gestión de tareas desarrollada con MongoDB, Express, React y Node.js (Stack MERN) 
siguiendo el [diseño provisto en Behance](https://www.behance.net/gallery/168706675/React-Js-Todo-List-App?tracking_source=search_projects&l=38)
### 📌Requerimientos basicos: 
- Persistencia de estado (guardar la data en una DB)
- Se espera que el resultado final sea lo más parecido posible al diseño proporcionado.
###📍Requerimientos extra:
- Test unitarios
- Docker compose para levantar todos los servicios
- Animaciones en UI que permitan una experiencia más agradable
- Aplicar principios SOLID dentro de su código
- Publicar el sitio en algún servicio de hosting gratuito (esto depende mucho de las tecnologías que se elijan)

## 💻Tecnologías:
Frontend: React.js + Vite
Backend: Node.js + Express
Base de datos: MongoDB Atlas
Estilos: CSS 
Testing: Jest + Supertest
Infraestructura : Docker Compose para ejecución local

## 📂Estructura principal del proyecto:
/reactJs_ToDoList_frontend
  /firebase
  /dist
  /node_modules
  /public
  /src
    /assets
    /components
    /hooks
    /pages
    /services
    App.jsx
    index.css
    main.jsx
    routes.jsx
    
  .firebaserc
  eslint.config.js
  firebase.json
  index.html
  package.json
  package-lock.json
  vite.config.js
  
/nodeJs_ToDoList_backend
  /vercel
  /configs
  /node_modules
  /src
    /models
    /controller
    /routes
    /helpers
    /middlewares
    
  .env
  index.js
  package.json
  package-lock.json
  vercel.json
  
docker-compose.yml
README.md
LICENSE
gitignore

## 🛠️Ejecucion local API Web:
### Clonar repositorio
git clone https://github.com/AnthonyJEscobarP/ToDo-List_API-WEB.git
cd ToDo-List_API-WEB
### Levantar servicios
docker compose up

## 💡Testing:
cd nodeJs_ToDoList_backend
npm run test

## 🌐 Despliegues:
 - Backend:
 - Frontend:

## 📄 Autoria:
Anthony Josue Escobar Ponce 
[Portafolio](https://ae--technologies.web.app/index.html)
[LinkedIn](https://www.linkedin.com/in/tuusuario/)
