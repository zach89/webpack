import zhc from "./zhc";

zhc
  .post("http://localhost:3000", { name: "zach", age: 123 })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  });
