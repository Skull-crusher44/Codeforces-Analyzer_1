import React from 'react';
import { Button } from '../ui/button';
import { User, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 flex">
                    <Link to="/Codeforces-Analyzer/" className="mr-6 flex items-center space-x-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block text-xl">
                            Codeforces Analyzer
                        </span>
                        <span className="font-bold sm:hidden text-lg">
                            CF Analyzer
                        </span>
                    </Link>
                </div>
                
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center space-x-2">
                        <Link to="/Codeforces-Analyzer/">
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <User className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Single User</span>
                                <span className="sm:hidden">User</span>
                            </Button>
                        </Link>
                        <Link to="/Codeforces-Analyzer/versus">
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                                <Users className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Versus Mode</span>
                                <span className="sm:hidden">Versus</span>
                            </Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
