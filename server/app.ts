// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    return console.log(`Express is listening on port ${port}`);
});