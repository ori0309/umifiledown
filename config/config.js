export default {
  proxy:{
    "/api/v2": {
      "target": "http://localhost:3001",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v2" : "" }
    }
  },
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true
      }
    ]
  ],
  routes: [
    { path: "/login", component: "./login" },
    {
      path: "/",
      component: "../layouts",
      routes: [
        // { path: "/", component: "./index" },
        { path: "/", component: "./files/index" },
        { path: "/files", component: "./files/index" },
        { path: "/count", component: "./count/index" },
        {
          path: "/about",
          component: "./about",
          Routes: ["./routes/PrivateRoute.js"]
        },
        {
          path: "/",
          component: "./users/_layout",
          routes: [
            { path: "/", component: "./users/index" },
            { path: "/users/:id", component: "./users/$id" }
          ]
        },
        {
          component: "./404"
        }
      ]
    }
  ]
};
