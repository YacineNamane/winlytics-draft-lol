import Banner from "../components/Banner";
import ChampionsList from "../components/ChampionsList";
import Draft from "../components/Draft";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="draft-lollike">
        <Draft side="ally" />
        <ChampionsList />
        <Draft side="enemy" />
      </div>
    </div>
  );
};

export default Home;
