
import {Resolver,Mutation,Arg, Ctx,Query} from "type-graphql";
const {skip}= require('graphql-resolvers');

const email= Ctx.prototype.email;
module.exports.isAuthenticated= (email :any)=>{
    console.log("Midleware, validar", email);
    if(!email){
        throw new Error('Acceso denegado')

    } 

    return skip

}