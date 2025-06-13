'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, User, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('https://api.oyonews.com.ng/wp-json');
        const data = await res.json();
        if (data?.site_icon_url) setLogoUrl(data.site_icon_url);
      } catch (error) {
        console.error('Error fetching site logo:', error);
      }
    };
    fetchLogo();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="w-full bg-white py-2 h-10" />
        <header className="bg-black text-white sticky top-0 z-50 h-16">
          <div className="container mx-auto px-4 flex items-center justify-between h-full">
            <div className="w-24 h-6 bg-gray-700 rounded animate-pulse" />
            <div className="w-32 h-6 bg-gray-700 rounded animate-pulse" />
          </div>
        </header>
      </>
    );
  }

  return (
    <>
  <style>{`div[data-widget-id="1800927"] { min-height: 300px; }`}</style>
      <div data-type="_mgwidget" data-widget-id="1800927"></div>
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Mobile Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white mr-3"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Oyonews Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                ) : (
                  <div className="bg-red-600 rounded p-2 mr-2">
                    <div className="text-white font-bold text-sm">ON</div>
                  </div>
                )}
                <span className="text-xl font-bold text-red-400">OYONEWS</span>
              </Link>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-red-400">Home</Link>
              <Link href="/search" className="text-white hover:text-red-400 flex items-center">
                <Search className="h-4 w-4 mr-1" /> Search
              </Link>
              <Link href="/about" className="text-white hover:text-red-400">About</Link>
              <Link href="/contact" className="text-white hover:text-red-400">Contact</Link>
              {isAuthenticated && (
                user?.role === 'administrator' ? (
                  <a
                    href="https://api.oyonews.com.ng/wp-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-400"
                  >
                    Admin Panel
                  </a>
                ) : (
                  <Link href="/dashboard" className="text-white hover:text-red-400">Dashboard</Link>
                )
              )}
            </nav>

            {/* Auth Button / User */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer border-2 border-white hover:border-green-400">
                      <AvatarFallback className="bg-red-600 text-white uppercase">
                        {getInitials(user?.name || user?.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem disabled>Hello, {user?.name}</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (user?.role === 'administrator') {
                          window.open('https://api.oyonews.com.ng/wp-admin', '_blank');
                        } else {
                          router.push('/dashboard');
                        }
                      }}
                    >
                      {user?.role === 'administrator' ? 'Admin Panel' : 'Dashboard'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                      className="text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-red-400 hidden sm:flex"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-5 w-5 mr-2" /> Login
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-red-400 sm:hidden"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile nav */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'max-h-64 opacity-100 border-t border-gray-700'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <nav className="py-4 space-y-1">
              {['/', '/search', '/about', '/contact'].map((path) => (
                <Link
                  key={path}
                  href={path}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-white hover:text-red-400 hover:bg-gray-800 transition rounded mx-2"
                >
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
              {isAuthenticated &&
                (user?.role === 'administrator' ? (
                  <a
                    href="https://api.oyonews.com.ng/wp-admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white hover:text-red-400 hover:bg-gray-800 transition rounded mx-2"
                    onClick={closeMobileMenu}
                  >
                    Admin Panel
                  </a>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-white hover:text-red-400 hover:bg-gray-800 transition rounded mx-2"
                  >
                    Dashboard
                  </Link>
                ))}
              <div className="px-4 py-2 mx-2 sm:hidden">
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                      router.push('/');
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-red-400 w-full justify-start"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-red-400 w-full justify-start"
                    >
                      <User className="h-5 w-5 mr-2" /> Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
