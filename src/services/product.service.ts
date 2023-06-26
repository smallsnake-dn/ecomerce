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
            throw new BadRequest();
        const product = await ProductFactory.createProduct(type, body);
        if(!product) 
            throw new InternalServerError();
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
            throw new BadRequest("missing type");
        if(!id)
            throw new BadRequest("missing id product");
        const product = await ProductFactory.updateProduct(type, id, body);
        if(!product) 
            throw new InternalServerError();
        return product;
    }
}
