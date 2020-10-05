
import { Query, Resolver, Mutation, Arg, Field, InputType, Int } from 'type-graphql'
//Importar el modelo de datos de typeOMR, importar la entidad, para hacer el CRUD a a base de datos
import { Product } from '../entity/Producto'

@InputType()
class Productuserinput {
    @Field()
    name!: string
    @Field()
    quantity!: number
}

@Resolver()
export class ProductResolver {
    //Indica que retorna cuando se ejecuta la Consulta
    @Query(() => [Product])
    products() {
        return Product.find();
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg("variables", () => Productuserinput)
        variables: Productuserinput
    ) {
        const newProduct = Product.create(variables);
        console.log(newProduct);
        return await newProduct.save()
    }

    @Mutation(() => Boolean)
    async deleteproduct(@Arg("id", () => Int) id: number) {
        await Product.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateproduct(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => Productuserinput) fields: Productuserinput) {
        Product.update({id},fields);
        return true;
    }

}