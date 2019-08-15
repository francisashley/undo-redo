const mix = require("laravel-mix");

mix.react("./src/index.js", "public/main.js").sourceMaps();
