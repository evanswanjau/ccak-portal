import { RiCloseCircleFill } from "react-icons/ri";
import { capitalize } from "../../helpers/strings";

export const FilterForm = ({ page, search, updateSearch }) => {
    if (page === "posts") {
        const categories = [
            "press-release",
            "news",
            "projects",
            "blog",
            "careers",
            "consultancy",
            "funding-opportunities",
            "events",
            "photo-gallery",
            "internal-publications",
            "external-publications",
            "newsletters",
        ];

        return (
            <div className="py-3 flex justify-end space-x-2">
                <input
                    className="w-3/12 text-sm block text-gray-700 border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Search posts"
                    value={search.keyword}
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            keyword: event.target.value,
                        });
                    }}
                />
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            category: event.target.value,
                        });
                    }}
                >
                    <option value={""}>Choose Category</option>
                    {categories.map((category) => {
                        return (
                            <option
                                key={category}
                                value={category}
                                selected={search.category === category}
                            >
                                {capitalize(category.replace(/-/, " "))}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            access: event.target.value,
                        });
                    }}
                >
                    <option value={""}>Choose Access</option>
                    {["public", "private", "hidden"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item}
                                selected={search.access === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="w-2/12 block text-sm text-gray-700 bg-white border border-gray-200 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                    onChange={(event) => {
                        updateSearch({
                            ...search,
                            status: event.target.value,
                        });
                    }}
                >
                    <option value={""}>Choose Status</option>
                    {["published", "draft"].map((item) => {
                        return (
                            <option
                                key={item}
                                value={item.toLowerCase()}
                                selected={search.status === item}
                            >
                                {item.slice(0, 1).toUpperCase() +
                                    item.substring(1)}
                            </option>
                        );
                    })}
                </select>
                <button
                    type="button"
                    className="flex focus:outline-none bg-gray-100 text-teal-900 hover:bg-gray-200 font-medium rounded-lg text-sm px-3 pt-2 pb-[0.8em] transition duration-150 ease-in-out"
                    onClick={() => {
                        updateSearch({
                            keyword: "",
                            table: "posts",
                            category: "",
                            technology: "",
                            project_status: "",
                            access: "",
                            status: "",
                            page: 1,
                            limit: 10,
                            ip_address: "",
                        });
                    }}
                >
                    <RiCloseCircleFill className="text-sm mr-2 mt-1" />
                    Reset
                </button>
            </div>
        );
    }
};
