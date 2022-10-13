// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import { NextFunction, Request, Response } from "express";
import path from "path";

class DocsController {
    public getOpenAPIJSON = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const options = {
                root: path.join(__dirname, "../../../static"),
            };
            res.sendFile("./generated/openapi.json", options);
        } catch (error) {
            next(error);
        }
    };
}

export default DocsController;