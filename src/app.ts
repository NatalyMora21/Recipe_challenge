//ARCHIVO PARA CONFIGURAR EL SERVIDOR

import express from 'express';
//Llamamos la clase ApolloServer que va a permitir crar una ruta(Endpoint) de mi servidor la API de graphql
import { ApolloServer } from 'apollo-server-express'



//Convertir de type-graphql a esquema de graphql
import { buildSchema,ArgumentValidationError } from 'type-graphql'



//connect-redis proporciona almacenamiento de sesiones de Redis para Express

//Rcibe clase creada por type-graphql
import { ProductResolver } from './resolvers/productResolver'

//Rcibe clase creada por type-graphql
import { RecipeResolver } from './resolvers/recipeResolver'

//Rcibe clase creada por type-graphql
import { SingUpResolver } from './resolvers/UserResolver'
import { LoginResolver } from './resolvers/login'


const {verifyUser} = require('./context/context')



//Rcibe clase creada por type-graphql
//import { RicipeResolver } from './resolvers/recipeResolver'

import cors from 'cors'

//Crear un servidor
export async function startServer() {

const app = express();

app.use(cors());

app.use(express.json());

    //Express es la forma de iniciar un servidor http y manejar las rutas

        //Express es el servidor completo, apollo server solo se va a encargar de la API DE GRAPHQL(Ruta)
    //schema va a recibir el esquema de graphql(Que es lo que podemos consultar que es lo que podemos crear) que estamos recibiendo

    //Una vez ApolloServer se ejecute va a devolver un servidor y es el que se va a aplicar a express
    
    const schema= 
    await buildSchema({
        resolvers: [ProductResolver,RecipeResolver,SingUpResolver,LoginResolver]
    })
    const server = new ApolloServer({
        
        //Se realiza la conversión del resolver a graphql
        schema ,
        //formatError:ArgumentValidationError,
        //Desde la funciones se pueden usar los objetos
        //Podemos acceder a los datos de la sessión basado en este
        //Podemos accceder en los resolvers
        //Para que el servidor apollo nos de acceso al objeto de la solicitud
        //Lo puedo usar en cualquier resolver
            context:async({req})=> {
                const reqemail= await verifyUser(req);
                return{
                email: reqemail
                
                }
            }


        
    })



    //Estot diciendo que apollo va a funcionar dentro del servidor de express
    //Si voy a la ruta que me mostrará la interfaz para hacer pruebas
    server.applyMiddleware({ app, path: '/graphql' });


    //Para poder iniciar el servidor se debe exportar el app
    //Devuelve la app con el servidor configurado más no iniciado   
    return app;

}




//Crar una ruta de graphql
