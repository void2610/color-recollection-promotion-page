"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/data/site";

export function SiteNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="lg"
      className="bg-background/70 backdrop-blur-md"
    >
      <NavbarBrand as={Link} href="/" className="gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#00b7eb]" />
          <span className="h-3 w-3 rounded-full bg-[#e0218a]" />
          <span className="h-3 w-3 rounded-full bg-[#f5c518]" />
        </span>
        <span className="font-bold tracking-wide">{SITE.title}</span>
      </NavbarBrand>

      <NavbarContent justify="end" className="hidden gap-6 sm:flex">
        {NAV_ITEMS.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link
              href={item.href}
              className={
                pathname === item.href
                  ? "text-sm font-semibold text-foreground"
                  : "text-sm text-foreground-500 transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"} />
      </NavbarContent>

      <NavbarMenu className="bg-background/90 backdrop-blur-md">
        {NAV_ITEMS.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
