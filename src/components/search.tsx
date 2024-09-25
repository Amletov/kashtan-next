"use client";

import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";

type Props = {
  setSearchQuery: (searchQuery: string) => any;
};

export default function Search({ setSearchQuery }: Props) {

  const debouncedChange = debounce(search, 300);

  const [searchInput, setSearchInput] = useState("");
  function search(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
    setSearchQuery(event.target.value);
  }

  return (
    <div className="flex flex-col self-center py-8 space-y-2">
      <Label htmlFor="searchQuery">Поиск</Label>
      <Input
      name="searchQuery"
      className="max-w-xs "
      placeholder="..."
      onChange={debouncedChange}
    />
    </div>
    
  );
}
