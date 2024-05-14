import Banner from "../Component/Banner";
import NewsLetter from "../Component/NewsLetter";
import RecentBlog from "../Component/RecentBlog";
import Slider from "../Component/Slider";

const Home = () => {
    
    return (
        <div>
            <Banner />
            <RecentBlog />
            <NewsLetter />
            <Slider />
        </div>
    );
};

export default Home;