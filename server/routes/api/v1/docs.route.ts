// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import express from "express";
import swaggerUi from "swagger-ui-express";
import { Route } from "../../../interfaces/route.interface";
import DocsController from "../../../controllers/api/v1/docs.controller";

class DocsRoute implements Route{
    public path = "/api/v1/docs";
    public router = express.Router();
    private controller = new DocsController();

    constructor() {
        this.registerRoutes();
    }

    private registerRoutes():void {
        this.router.get("/openapi.json", this.controller.getOpenAPIJSON);
        this.router.use("/", swaggerUi.serve);

        // In development, this will just be the petstore file as a
        // stand in as the docs haven't been built. In prod, this will
        // return the actual docs
        const options = {
            swaggerOptions: {
                url: "/api/v1/docs/openapi.json"
            }
        };
        this.router.get("/", swaggerUi.setup(null, options));
    }

}

export default DocsRoute;
