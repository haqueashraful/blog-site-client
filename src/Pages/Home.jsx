import Banner from "../Component/Banner";
import Faq from "../Component/Faq";
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
            <Faq />
        </div>
    );
};

export default Home;