import { Query, Resolver, Mutation, Arg, Field, InputType, Int,Ctx,ID} from 'type-graphql'
//Importar el modelo de datos de typeOMR, importar la entidad, para hacer el CRUD a a base de datos
import { Category } from '../entity/category';

@InputType()
class Categoryinput {
    @Field()
    name!: string
}

@Resolver()
export class categoryResolver{

  //Consultar todas las Categorias
  @Query(() => [Category])
  getcategory() {
    //Hace una consulta a mysql y retorna un arreglo con los datos
    return Category.find();
  }
  //Consultar una Category
  @Query(() => Category)
  getOneCategory(@Arg("id", () => Int) id: number) {
    return Category.findOne(id);
  }
  //Crear Category
  @Mutation(() => Category)
  addRecipe(@Arg("variables") categoryinput: Categoryinput):
    Promise<Category> {
    const Categorynew = Category.create(categoryinput).save();
    return Categorynew;
  }
  //Actualizar Category 
  @Mutation(() => Category)
  upadateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => Categoryinput) fields: Categoryinput
  ) {
    return Category.update({ id }, fields);
  }
  //Eliminar Category
  @Mutation(() => Boolean)
  async deleteproduct(@Arg("id", () => Int) id: number) {
      //Type ORM para eliminarlo desde graphql
      await Category.delete(id);
      return true;
  }

}