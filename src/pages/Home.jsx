import Hello from "../components/Hello";
import ChampionsList from "../components/ChampionsList";
import Draft from "../components/Draft";
const Home = () => {
  return (
    <div>
      <Hello />
      <div className="draft-lollike">
        <ChampionsList />
        <Draft />
      </div>
    </div>
  );
};

export default Home;
