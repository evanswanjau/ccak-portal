import { Fade } from "react-reveal";
import { simpleDate } from "../helpers/date";

export const Post = ({ data: { title, published, image } }) => {
    return (
        <Fade>
            <>
                <div
                    style={{
                        backgroundImage: `url(${
                            process.env.REACT_APP_IMAGEKIT + image
                        })`,
                    }}
                    className={`bg-cover bg-center bg-no-repeat rounded-lg text-white h-40`}
                ></div>
                <p className="text-xs py-2 text-gray-400">
                    {simpleDate(published)}
                </p>
                <h3 className="text-gray-800 group-hover:text-[#ED7423] text-sm transition duration-300 ease-in-out">
                    {title}
                </h3>
            </>
        </Fade>
    );
};
