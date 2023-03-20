const importAll = (context) => {
  const keys = context.keys();
  const albuns = {};

  keys.forEach((key) => {
    const [, album, file] = key.split("/");

    if (albuns[album] === undefined) albuns[album] = {};
    albuns[album][file] = context(key);
  });

  return albuns;
};

const albuns = importAll(
  require.context("../albuns", true, /\.(gif|jpe?g|svg|png)$/)
);

export default albuns;
