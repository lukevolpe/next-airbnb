'use client';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import Container from '../Container';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'These properties are close to the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'These properties have windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'These properties are modern',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'These properties are in the countryside',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'These properties have pools',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'These properties are located on an island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'These properties are located near a lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'These properties are located near ski resorts',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'These properties are located in castles',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'These properties have camping acitivies nearby',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'These properties are located in arctic climates',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'These properties have caves nearby',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'These properties are located in a desert',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'These properties are located in a barn',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'These properties are luxurious',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
      pt-4
      flex
      flex-row
      items-center
      justify-between
      overflow-x-auto
      "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
