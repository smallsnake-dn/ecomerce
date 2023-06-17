import { ProductFactory } from "../factories/product.factory";
import { BadRequest, InternalServerError } from "../core/error.respone";

export class ProductService {
    static async createProduct(body: {
        type: string;
        name: string;
        description: string;
        image: string;
        price: string;
    }) {
        const type: string = body.type;
        if(!type)
            return new BadRequest();
        const product = await ProductFactory.createProduct(type, body);
        if(!product) 
            return new InternalServerError();
        return product;
    }

    static async updateProduct(id : string, body: {
        type: string;
        name: string;
        description: string;
        image: string;
        price: string;
    }) {
        const type: string = body.type;
        if(!type)
            return new BadRequest();
        if(!id)
            return new BadRequest();
        const product = await ProductFactory.updateProduct(type, id, body);
        if(!product) 
            return new InternalServerError();
        return product;
    }
}
