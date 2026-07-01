import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_3.png';
import { NAV_ITEMS } from '../../constants/nav';

const specializedNav = NAV_ITEMS.find((n) => n.id === 'specialized')!;

interface SpecializedLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const SpecializedLayout = ({ title, children }: SpecializedLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={specializedNav.sub}
    categoryLabel={specializedNav.label}
    categoryId={specializedNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default SpecializedLayout;
