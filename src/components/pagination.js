import React from "react";

export const Pagination = ({
    paginationData: { previous, next, count },
    search,
    updateSearch,
}) => {
    const pages = Math.ceil(count / search.limit);

    let elements = [];
    for (let i = 1; i < pages + 1; i++) {
        elements.push(
            <li
                key={i}
                className={`flex items-center justify-center px-3 h-8 leading-tight  ${
                    search.page === i
                        ? "bg-teal-900 text-white hover:bg-teal-700"
                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                } border border-gray-200 cursor-pointer`}
                onClick={() => {
                    updateSearch({
                        ...search,
                        page: i,
                    });
                }}
            >
                {i}
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                <li
                    className={`${
                        previous
                            ? "hover:bg-gray-100 hover:text-gray-700 text-gray-500 bg-white cursor-pointer"
                            : "text-gray-300 bg-gray-100 cursor-pointer"
                    } flex items-center justify-center px-3 h-8 leading-tight border border-gray-200 rounded-l-md `}
                    onClick={() => {
                        if (previous)
                            updateSearch({
                                ...search,
                                page: parseInt(previous.split("=")[1]) || 1,
                            });
                    }}
                >
                    Previous
                </li>
                {elements.map((element) => element)}
                <li
                    className={`${
                        next
                            ? "hover:bg-gray-100 hover:text-gray-700 text-gray-500 bg-white cursor-pointer"
                            : "text-gray-300 bg-gray-100 cursor-pointer"
                    } flex items-center justify-center px-3 h-8 leading-tight border border-gray-200 rounded-r-md `}
                    onClick={() => {
                        if (next)
                            updateSearch({
                                ...search,
                                page: parseInt(next.split("=")[1]) || 1,
                            });
                    }}
                >
                    Next
                </li>
            </ul>
        </nav>
    );
};
