
// scripts.js

import {company} from "./configuration.js";
import {year} from "./configuration.js";

const message = "© " + company + year;
const footer = document.querySelector('footer');
footer.innerText = message;
