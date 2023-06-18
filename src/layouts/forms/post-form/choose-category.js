import { BsFilePdf } from "react-icons/bs";
import { HiOutlineMicrophone } from "react-icons/hi";
import {
    HiOutlinePresentationChartBar,
    HiOutlinePhoto,
    HiOutlineBriefcase,
    HiOutlineBanknotes,
    HiOutlineCalendarDays,
    HiOutlineNewspaper,
    HiOutlineAcademicCap,
    HiOutlinePencilSquare,
} from "react-icons/hi2";

const categories = [
    {
        name: "press-release",
        icon: <HiOutlineMicrophone className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "news",
        icon: <HiOutlineNewspaper className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "projects",
        icon: (
            <HiOutlinePresentationChartBar className="text-3xl mr-5 w-2/12" />
        ),
    },
    {
        name: "blog",
        icon: <HiOutlinePencilSquare className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "careers",
        icon: <HiOutlineAcademicCap className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "consultancy",
        icon: <HiOutlineBriefcase className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "funding-opportunities",
        icon: <HiOutlineBanknotes className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "events",
        icon: <HiOutlineCalendarDays className="text-3xl mr-5 w-2/12" />,
    },

    {
        name: "photo-gallery",
        icon: <HiOutlinePhoto className="text-3xl mr-5 w-2/12" />,
    },

    {
        name: "publications",
        icon: <BsFilePdf className="text-3xl mr-5 w-2/12" />,
    },
    {
        name: "newsletters",
        icon: <BsFilePdf className="text-3xl mr-5 w-2/12" />,
    },
];

export const ChooseCategory = ({ data, updateData, submitData }) => {
    return (
        <>
            <h2 className="text-3xl text-gray-600 capitalize">
                Choose Category
            </h2>
            <ul className="grid grid-cols-3 gap-8 my-5">
                {categories.map((category) => {
                    return (
                        <li
                            key={category.name}
                            className="p-5 border-2 cursor-pointer rounded-lg shadow-md border-transparent curseor-pointer capitalize flex text-gray-600 hover:bg-teal-900 hover:text-white transition duration-150 ease-in-out"
                            onClick={() => {
                                updateData({
                                    ...data,
                                    step: "writing",
                                    category: category.name,
                                    folder: category.name.replace(/ /g, "_"),
                                });
                                submitData("post", "post", {
                                    ...data,
                                    step: "writing",
                                    category: category.name,
                                    folder: category.name.replace(/ /g, "_"),
                                });
                            }}
                        >
                            {category.icon}
                            {category.name.replace(/-/g, " ")}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
