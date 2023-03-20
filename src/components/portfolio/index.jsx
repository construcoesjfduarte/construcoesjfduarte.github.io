import Album from "../album";

const Portfolio = ({ albuns }) => {
  console.log(albuns);
  return (
    <>
      {Object.entries(albuns).map(([name, photos]) => (
        <Album key={name} name={name} photos={photos} />
      ))}
    </>
  );
};

export default Portfolio;
