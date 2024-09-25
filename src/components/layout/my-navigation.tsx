import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Dashboard from "../dashboard";

const references: { title: string; href: string; description: string }[] = [
  {
    title: "Города",
    href: "http://localhost:3000/cities",
    description: "Справочник городов.",
  },
  {
    title: "Типы собственности",
    href: "http://localhost:3000/property_types",
    description: "Справочник типов собственности.",
  },
  {
    title: "Продукция",
    href: "http://localhost:3000/products",
    description: "Справочник продукции.",
  },
  {
    title: "Типы платежа",
    href: "http://localhost:3000/payment_forms",
    description: "Справочник типов платежей.",
  },
];

const tables: { title: string; href: string; description: string }[] = [
  {
    title: "Агенства",
    href: "http://localhost:3000/agencies",
    description: "Таблица агенств.",
  },
  {
    title: "Продукция агенств",
    href: "http://localhost:3000/agency_products",
    description: "Таблица продукции агенств.",
  },
  {
    title: "Клиенты",
    href: "http://localhost:3000/clients",
    description: "Таблица клиентов рекламных агенств.",
  },
  {
    title: "Заказы",
    href: "http://localhost:3000/orders",
    description: "Таблица заказов клиентов.",
  },
  {
    title: "Пользователи",
    href: "http://localhost:3000/users",
    description: "Таблица пользователей БД.",
  },
];

export default function Navigation() {
  return (
    <header className="flex justify-between p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/queries" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Зарпосы
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Таблицы</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {tables.map((table) => (
                  <ListItem
                    key={table.title}
                    title={table.title}
                    href={table.href}
                  >
                    {table.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Справочники</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {references.map((ref) => (
                  <ListItem key={ref.title} title={ref.title} href={ref.href}>
                    {ref.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Dashboard />
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
