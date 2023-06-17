import { Router } from "express";
import productController from "../../controllers/product.controller";
import { asyncHandler } from "../../helpers/asyncHandler";


export const routerProduct = Router();


routerProduct.post('/product', asyncHandler(productController.createProduct));
routerProduct.patch('/product/:id', asyncHandler(productController.updateProduct));




