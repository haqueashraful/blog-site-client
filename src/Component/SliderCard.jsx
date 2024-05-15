
const SliderCard = ({data}) => {

    const { title, userName , userPhoto, category, image_url } = data;

    return (
        <div style={{ backgroundImage: `url(${image_url})`, backgroundSize: "cover", backgroundPosition: "center" }} className="w-full min-h-[300px]  max-h-[300px] rounded-md shadow-md ">
               <div className="w-full min-h-[300px] max-h-[300px] px-4 py-2 rounded-md shadow-md  flex flex-col justify-center items-center bg-white/60">
               <div className="w-full flex justify-between items-center ">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <p className="text-white font-bold bg-black/60 px-3 rounded-full">{category}</p>
                </div>
                <div className="text-black my-5">
                    <p className="font-bold"> Blog Added By</p>
                </div>
                <div className="w-full flex gap-2 justify-center items-center ">
                    <img
                        src={userPhoto}
                        alt={title}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                    <h1 className="text-lg font-bold">{userName}</h1>
                </div>
               </div>
        </div>
    );
};

export default SliderCard;