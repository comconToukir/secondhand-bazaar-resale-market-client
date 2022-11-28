import banner from "../../../assets/images/Home/home-page-banner.webp";
import offer from "../../../assets/images/Home/3.webp";
import HomeAdvertisement from "./HomeAdvertisement/HomeAdvertisement";
import ThreeCategories from "./ThreeCategories/ThreeCategories";
import SiteFeatures from "./SiteFeatures/SiteFeatures";

const Home = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <header className="mt-4">
        <img src={banner} className="mb-12" alt="" />
        <img src={offer} alt="" />
      </header>

      <main className="">
        <SiteFeatures />
        <ThreeCategories />
        <HomeAdvertisement />
      </main>
    </div>
  );
};

export default Home;
