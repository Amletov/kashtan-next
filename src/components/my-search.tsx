"use client";

import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";

type Props = {
  setSearchQuery: (searchQuery: string) => any;
};

export default function MySearch({ setSearchQuery }: Props) {

  const debouncedChange = debounce(search, 300);

  const [searchInput, setSearchInput] = useState("");
  function search(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
    setSearchQuery(event.target.value);
  }

  return (
    <div className="flex flex-col items-center py-8">
      <Input
      name="searchQuery"
      className=""
      placeholder="..."
      onChange={debouncedChange}
    />
    </div>
    
  );
}
