import { ProductAttribute } from "../core/type.custom";
import productModel from "../models/product.model";

export class Product {
    name? : String | undefined;
    description? : String | undefined;
    image? : String | undefined;
    price? : String | undefined;

    constructor(data : ProductAttribute) {
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.price = data.price;
    }
}


interface IProduct {
    createProduct : () => Promise<any>;
    updateProduct : (id : string) => Promise<any>;
}


export class ElectricProduct extends Product implements IProduct {
    async createProduct(): Promise<any> {
        const product = await productModel.create(this);
        return product;
    };
    async updateProduct(id: string) : Promise<any> {
        const product = await productModel.findOneAndUpdate({_id : id}, this);
        return product;
    };

}


export class ClothesProduct extends Product implements IProduct {
    async createProduct(): Promise<any> {
        const product = await productModel.create(this);
        return product;
    };
    async updateProduct(id: string) : Promise<any> {
        const product = await productModel.findOneAndUpdate({_id : id}, this);
        return product;
    };

}


export class ProductFactory {
    static getProduct(type : string, data : ProductAttribute) {
        switch (type) {
            case "electric":
                return (new ElectricProduct(data));
                break;
            case "clothes":
                return (new ClothesProduct(data));
                break;
            default:
                break;
        }
    }
    static async createProduct(type : string, data : ProductAttribute) {
        return await this.getProduct(type, data)?.createProduct();
    }

    static async updateProduct(type : string,  id : string, data : ProductAttribute) {
        return await this.getProduct(type, data)?.updateProduct(id);
    }
}

