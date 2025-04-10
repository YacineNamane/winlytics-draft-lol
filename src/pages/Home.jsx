import Banner from "../components/Banner";
import ChampionsList from "../components/ChampionsList";
import Draft from "../components/Draft";
import ProcessedData from "../components/WinRate";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="draft-lollike">
        <ChampionsList />
        <Draft />
      </div>
    </div>
  );
};

export default Home;
