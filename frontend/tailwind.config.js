
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
     darkMode: false,
     theme: {
       extend: {},
     },
     variants: {
      extend: {
        animation: {
          bounce200: "bounce 1s infinite 200ms",
          bounce400: "bounce 1s infinite 400ms",
        },
      },
     },
   plugins: [],
   };

