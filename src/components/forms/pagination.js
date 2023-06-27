import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export const Pagination = ({ data, updateData }) => {
    return (
        <nav className="flex justify-end">
            <ul className="inline-flex -space-x-px shadow-lg rounded-lg bg-white">
                <li className="flex px-3 py-2 ml-0 leading-tight text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-l-lg cursor-pointer">
                    <RiArrowLeftLine className="text-sm mr-2 mt-[0.1em]" />
                    Previous
                </li>
                <li className="px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    1
                </li>
                <li className="px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    2
                </li>
                <li className="px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    3
                </li>
                <li className="px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    4
                </li>
                <li className="px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    5
                </li>
                <li className="flex px-3 py-2 leading-tight text-sm text-gray-500 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer">
                    Next
                    <RiArrowRightLine className="text-md ml-2 mt-[0.1em]" />
                </li>
            </ul>
        </nav>
    );
};
