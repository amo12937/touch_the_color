"use strict";

import wu from "wu"

export default (m) => wu.repeat(m).map((n) => Math.floor(Math.random() * n))

