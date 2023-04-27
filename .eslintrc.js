module.exports = {
    globals: {
        Urso: true,
        MODE: true,
        gsap: true,
    },
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        indent: ['error', 4],
        'global-require': 0,
        'no-underscore-dangle': 0,
        'class-methods-use-this': 0,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'no-continue': 0,
        'no-bitwise': 0,
        'lines-between-class-members': 0,
    },
    linebreak: ["unix", "windows"]
};
