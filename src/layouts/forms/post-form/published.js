import { RiArrowRightLine } from "react-icons/ri";

export const Published = ({
    data,
    updateData,
    submitData,
    getData,
    setRevealForm,
}) => {
    return (
        <div className="flex justify-center h-[calc(100vh-14em)]">
            <div className="text-center mt-10 w-9/12 h-fit">
                <h2 className="text-4xl text-gray-800">Congratulations</h2>
                <h3 className="text-xl text-gray-400 my-5">
                    Your{" "}
                    <span className="text-teal-900">
                        {data.category.replace(/-/g, " ")}
                    </span>{" "}
                    post has been published successfully. <br />
                    It will be visibile to{" "}
                    <span className="text-teal-900"> {data.access} </span>{" "}
                    members from{" "}
                    <span className="text-teal-900">
                        {" "}
                        {data.published.split("T").join(" ")}{" "}
                    </span>
                </h3>
                <h3 className="text-xl text-gray-900 mt-10">{data.title}</h3>
                <h3 className="text-gray-600 my-2">{data.excerpt}</h3>
                <button
                    type="button"
                    className="flex mx-auto my-10 text-white bg-teal-900 hover:bg-teal-950 font-medium rounded-lg text-sm px-4 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateData({
                            ...data,
                            status: "published",
                        });
                        submitData("post", "post/update/" + data.id, {
                            ...data,
                            step: "published",
                            status: "published",
                        }).then(() => {
                            getData();
                            setRevealForm(false);
                        });
                    }}
                >
                    Continue to posts
                    <RiArrowRightLine className="text-sm ml-2 mt-1" />
                </button>
            </div>
        </div>
    );
};
