module.exports = {
  apps: [
    {
      name: "nestjs-test-api",
      script: "dist/main.js",
      instances: "max", // 单实例，可改为 'max' 自动使用全部CPU
      autorestart: true,
      watch: false, // 生产环境一般关闭watch
      max_memory_restart: "500M", // 内存超限重启
      env: {
        NODE_ENV: "production",
        PORT: 3888,
      },
    },
  ],
};
