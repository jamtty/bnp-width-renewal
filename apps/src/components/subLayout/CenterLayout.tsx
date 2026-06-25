import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const centerNav = NAV_ITEMS.find((n) => n.id === 'center')!;

interface CenterLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const CenterLayout = ({ title, children }: CenterLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={centerNav.sub}
    categoryLabel={centerNav.label}
    categoryId={centerNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default CenterLayout;
