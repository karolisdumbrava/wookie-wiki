import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row lg:min-h-screen sticky top-0">
            <nav className="bg-black p-4 lg:w-64 lg:h-screen lg:fixed">
                <div className="flex justify-between lg:block">
                    <h1 className="text-2xl font-bold text-white mb-4">
                        Wookiee-Wiki
                    </h1>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden px-2 py-1 text-white"
                    >
                        Menu
                    </button>
                </div>
                <ul className={` ${isOpen ? 'block absolute bg-black w-full -ml-4' : 'hidden'} lg:block`}>
                    <li onClick={() => setIsOpen(false)}>
                        <Link to="/about" className="block p-2 lg:inline-block text-yellow-500 hover:text-yellow-400 lg:mt-0 lg:mr-4">About</Link>
                    </li>
                    <li onClick={() => setIsOpen(false)}>
                        <Link to="/films" className="block p-2 lg:inline-block text-yellow-500 hover:text-yellow-400 lg:mt-0 lg:mr-4">Films</Link>
                    </li>
                </ul>
            </nav>

        </div>
    )
};
