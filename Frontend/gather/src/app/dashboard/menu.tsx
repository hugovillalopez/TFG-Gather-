"use client";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu(){
    const pathname = window.location.pathname
    return(
        <div className="flex flex-1 bg-trasparent justify-center">
    <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto ">

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                    <Link href="/dashboard" className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group ${pathname == "/dashboard" ? "bg-orange-500" : "" }`}>
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Tickets
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Agents
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Customers
                            
                        </a>
                    </nav>

                    

                    <nav className="flex-1 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Products
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Orders
                        </a>

                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Analytics
                            {/*<svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>*/}
                        </a>
                    </nav>

                   

                    <nav className="flex-1 space-y-2">
                        <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 dark:text-white text-gray-900 hover:text-white rounded-lg hover:bg-orange-500 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}