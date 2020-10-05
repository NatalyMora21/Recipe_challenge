//Metodos que van a permitir crar datos, consultar datos CRUD
import { Query, Resolver, Mutation, Arg, Field, InputType, Int, Ctx, ID } from 'type-graphql'
import { Recipes } from '../entity/Recipe'
import { Category } from '../entity/category';
import { Users } from '../entity/users'
import { Context } from 'vm';
import { strict } from 'assert';
import { stringify } from 'querystring';


@InputType()
class Recipeinput {
  @Field()
  name!: string
  @Field()
  Description!: string
  @Field(type => String)
  ingredients!: string;
}

//Definir la clase product con las acciones que quiero hacer sobre la clase
@Resolver()
export class RecipeResolver {

  /*constructor(
      @InjectRepository(Recipes) private readonly recipeRepository: Repository<Recipes>,
    ) {}*/

  //constructor(private recipeService: Recipeinput) {}



  //Mutaciónconsulta:  que se encarga de guardar o generar datos en el servidor
  //Voy a importar una mutación
  //Indica que retorna cuando se ejecuta la mutacion
  /* @Mutation(() => Recipes)
   async createRecipe(
       @Arg("variables", () => Recipeinput)
       variables: Recipeinput,
       @Ctx() { contextuser }: Context

   ) {
       //Ir a la entidad y pasarle los parametros, esto es una promesa

       //Aceptar un objeto con las variables
       //await Product.insert({name, quantity})
       const newProduct = Recipes.create(variables, 
           );
       console.log(newProduct);
       return await newProduct.save()

   }*/


  /*@Mutation(returns => Recipes)
  addRecipe(@Arg("variables") recipeInput: Recipeinput, 
  @Ctx() { contextuser }: Context): 
  Promise<Recipes> {
    const recipenew = Recipes.create({
      ...recipeInput,
      userReceta: contextuser,
    }).save();
    return recipenew;
  }*/

  //Consultar todas las recetas
  @Query(() => [Recipes])
  getrecipes() {
    //Hace una consulta a mysql y retorna un arreglo con los datos
    return Recipes.find();
  }
  //Consultar una receta
  @Query(() => String)
  getOneRecipe(@Arg("id", () => Int) id: number) {
    return Recipes.findOne(id);
  }


  //Create Recipe
  @Mutation(() => Recipes)
  async addRecipe(
    @Arg("variables") recipeInput: Recipeinput,
    @Ctx() ctx: Context) :Promise<Recipes | null>{
    //Traer el id 
      let email= String(ctx.email)
  
    console.log("correo", email);
    let userlog = await Users.findOne({ where:{email}});

    let id= String(userlog?.id)
    console.log("userlog", userlog?.id);
    const recipenew = Recipes.create({...recipeInput,userReceta: id}).save();
    return recipenew;
  }
  //Actualizar  
  @Mutation(() => Recipes)
  upadateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => Recipeinput) fields: Recipeinput
  ) {
    return Recipes.update({ id }, fields);
  }
  //Eliminar
  @Mutation(() => Boolean)
  async deleteproduct(@Arg("id", () => Int) id: number) {
    //Type ORM para eliminarlo desde graphql
    await Recipes.delete(id);
    return true;
  }

}