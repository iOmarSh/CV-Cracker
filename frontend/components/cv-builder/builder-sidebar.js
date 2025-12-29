import { FaHome, FaFileAlt, FaTachometerAlt } from "react-icons/fa";

export default function BuilderSideBar() {
    return <div id={"SideBar"}
        className="z-7 sidebar:flex sidebar:h-screen
                sidebar:w-30 sidebar:pt-8 sidebar:flex-col
                 sticky top-0 hidden w-full xl:w-[130px]">
        <div className="sidebar:top-8 sticky top-0 w-full">
            <nav
                className="sidebar:rounded-large sidebar:shadow-themeShadow
                sidebar:pb-4 flex w-full flex-col
                items-center bg-[#111316]
                shadow-[rgb(0_0_0)_0px_0px_10px_0px]">
                <div className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content_min-content_min-content]
                 grid w-full max-w-full
                 grid-cols-[min-content_1fr_0px]
                 md:grid-cols-[60px_1fr_60px]">

                    {/* Home Icon - Goes to Homepage */}
                    <a className="sidebar:justify-center sidebar:pb-2 sidebar:pl-0
                    sidebar:pt-6 group relative flex w-full
                     items-center pl-4 hover:cursor-pointer md:pl-6"
                        href={"/"}
                        aria-label="Go to Home">
                        <div
                            className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full group-hover:bg-[#1a1d21]">
                            <div className="text-[#2EFF8A] text-3xl">
                                <FaHome />
                            </div>
                        </div>
                        <div
                            className="bg-[#2EFF8A] sidebar:group-hover:flex absolute top-[90px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-[#0f1113]">
                            Home
                            <div
                                className="after:border-b-[#2EFF8A] h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                        </div>
                    </a>

                    {/* Dashboard Icon - Goes to Dashboard */}
                    <a className="sidebar:justify-center sidebar:pb-2 sidebar:pl-0
                    sidebar:pt-2 group relative flex w-full
                     items-center pl-4 hover:cursor-pointer md:pl-6"
                        href={"/dashboard"}
                        aria-label="Go to Dashboard">
                        <div
                            className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full group-hover:bg-[#1a1d21]">
                            <div className="text-[#9AA3A8] group-hover:text-[#2EFF8A] text-3xl transition-colors">
                                <FaTachometerAlt />
                            </div>
                        </div>
                        <div
                            className="bg-[#2EFF8A] sidebar:group-hover:flex absolute top-[90px] hidden min-w-fit flex-col items-center rounded-full border-solid p-1 px-2 text-xs font-bold text-[#0f1113]">
                            Dashboard
                            <div
                                className="after:border-b-[#2EFF8A] h-0 w-0 after:absolute after:-top-[15px] after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-b-[8px] after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-transparent"></div>
                        </div>
                    </a>

                    {/* Content Section - Currently Active */}
                    <a
                        className="sidebar:grid-cols-1 sidebar:grid-rows-[min-content_min-content]
                         grid grid-cols-[min-content_min-content_min-content]
                          items-stretch justify-center">
                        <div className="sidebar:pt-2 sidebar:pb-2 flex w-full flex-col
                         items-center justify-center pl-2 pr-2
                          bg-transparent sidebar:bg-transparent active"
                            href="" aria-current="page">
                            <span
                                className="text-[#E6E9EB] sidebar:rounded-large sidebar:w-[100px]
                          sidebar:h-[90px] flex cursor-pointer flex-col
                           items-center justify-center px-6 py-1.5
                           no-underline hover:opacity-80 xl:w-[110px] bg-[#1a1d21] rounded-lg">
                                <span
                                    className="flex items-center justify-center text-[#2EFF8A] text-3xl">
                                    <FaFileAlt />
                                </span>
                                <span
                                    className="text-[14px] mt-[6px] font-bold text-[#2EFF8A]">Content</span>
                            </span>
                        </div>

                    </a>
                </div>

            </nav>
        </div>
    </div>
}