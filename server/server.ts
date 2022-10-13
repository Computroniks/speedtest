// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import App from "./app";
import DocsRoute from "./routes/api/v1/docs.route";

const routes = [
    new DocsRoute()
];

const app = new App(routes);
app.listen();
