module.exports = [
  {
    script: "./dist/src/infra/http/index.js",
    name: "backend",
    exec_mode: "cluster",
    instances: 2,
  },
];
