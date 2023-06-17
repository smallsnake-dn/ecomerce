import { NextFunction, Request, Response } from "express";
import { OK } from "../core/success.respone";
import { ProductService } from "../services/product.service";

class ProductController {
    async createProduct(req: Request, res: Response, next: NextFunction) {
        new OK({
            message: "Create new product success!",
            statusCode: 201,
            metadata : await ProductService.createProduct(req.body)
        }).send(res);
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const id : string = req.params.id;
        new OK({
            message : "update product success!",
            statusCode : 204,
            metadata : ProductService.updateProduct(id, req.body)
        })
    }
}

export default new ProductController();
