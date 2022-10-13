// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import express from "express";
import { Route } from "./interfaces/route.interface";

export default class App {
    public app: express.Application;
    public port: string | number;

    /**
     * @param routes Routes to register
     */
    constructor(routes: Route[]) {
        this.app = express();
        this.port = 3000;

        if (routes.length < 1) {
            throw new Error("At least 1 route must be specified");
        }

        this.registerRoutes(routes);
    }

    /**
     * Start the server listening for requests
     */
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Express running on port ${this.port}`);
        });
    }

    /**
     * Add routes to server
     * @param routes Array of routes to add
     */
    private registerRoutes(routes: Route[]) {
        routes.forEach(route => {
            console.log(`Registering route: ${route.path}`);
            this.app.use(route.path, route.router);
        });
    }
}
