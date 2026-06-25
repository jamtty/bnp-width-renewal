import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const globalNav = NAV_ITEMS.find((n) => n.id === 'global')!;

interface GlobalLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const GlobalLayout = ({ title, children }: GlobalLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={globalNav.sub}
    categoryLabel={globalNav.label}
    categoryId={globalNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default GlobalLayout;
