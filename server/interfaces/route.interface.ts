// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

import { Router } from "express";

export interface Route {
    path: string;
    router: Router;
}