import { SortFilterItem } from '@/lib/marketplace/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav className="flex justify-between items-center gap-2 tablet:w-[175px]">
        {title ? <h3 className="hidden text-base text-neutral-500 tablet:flex tablet:w-[75px]">{title}</h3> : null}
        {/* <ul className="hidden md:block">
          <FilterItemList list={list} />
        </ul> */}
        {/* <ul className="md:hidden w-full"> */}
        <ul className="w-full tablet:w-[100px]">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
