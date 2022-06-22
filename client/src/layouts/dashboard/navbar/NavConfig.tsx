// components
import { Iconify } from '../../../components';

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} />;

const ICONS = {
  dashboard: getIcon('eva:bulb-outline'),
};

const navConfig = (isAuthenticated: boolean, address: string) => {
  if (isAuthenticated) {
    return [
      {
        subheader: 'Menu',
        items: [{ title: 'My products', path: `/user/${address}/products`, icon: ICONS.dashboard }],
      },
    ];
  }
  return [];
};

export default navConfig;
