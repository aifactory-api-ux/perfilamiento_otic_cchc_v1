module.exports = {
  testMatch: ["**/*.spec.ts", "**/*.test.js"],
  testEnvironment: "node",
  transform: {
    \^.+\.(ts|tsx)$": ["ts-jest", { "tsconfig": "backend/tsconfig.json" }],
    \^.+\.(js|jsx)$": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};
