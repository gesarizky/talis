const test = async (req, res) => {
  const datatest = {
    data: [
      {
        number: [1, 2, 3, 4, 5],
      },
      {
        number: [6, 7, 8, 9],
      },
    ],
  };
  datatest.data.map((Object) => {
    Object.number.map((ob) => {
      console.log(ob);
    });
  });
  res.status(200).json({ name: "John Doe" });
};
export default test;
