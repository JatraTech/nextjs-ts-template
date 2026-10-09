const port = process.env.HOST_FORWARD_APP_PORT;
if (!port) throw new Error("HOST_FORWARD_APP_PORT is required");

module.exports = {
  apps: [
    {
      name: "nextjs-frontend",
      exec_mode: "fork",
      instances: 1,
      script: "node_modules/next/dist/bin/next",
      args: "start -p " + port,
      interpreter: `${process.env.HOME}/.bun/bin/bun`,
      env_file: ".env",
    },
  ],
};
