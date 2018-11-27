module.exports = {
  silent: false,
  collectCoverage: true,
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "babel-jest"
  },
  "setupFiles": [
    "<rootDir>/jest.init.js"
   ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/style-mock.js",
    "~types/(.*)$": "<rootDir>/types/$1",
    "~/(.*)$": "<rootDir>/src/$1",
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
