// const ApiTools = (operate) => (str) => {
//   let name;
//   if (typeof operate === "string") {
//     name = operate;
//   }

//   if (typeof operate === "object") {
//     for (const key in operate) {
//       name = operate[key] + name;
//     }
//   }
//   console.log(name);
//   return (name) => {
//     return name + str;
//   };
// };
// const a = ApiTools((name) => {
//   name;
// })(Object);
// console.log(a());
