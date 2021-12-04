module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
    },
    "rules": {
        "indent": [
            "error",
            4,
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "no-unused-vars": "warn",
        "no-async-promise-executor": "off",
        "comma-dangle": [
            "error",
            "always-multiline",
        ],
    },
};
