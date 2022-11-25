import banner from "../../../assets/images/Home/home-page-banner.webp";
import offer from "../../../assets/images/Home/3.webp";
import HomeAdvertisement from "./HomeAdvertisement/HomeAdvertisement";
import ThreeCategories from "./ThreeCategories/ThreeCategories";

const Home = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <header>
        <img src={banner} className="mb-9" alt="" />
        <img src={offer} alt="" />
      </header>

      <main className="mt-9">
        <HomeAdvertisement />
        <ThreeCategories />
      </main>
    </div>
  );
};

export default Home;
