import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const academyNav = NAV_ITEMS.find((n) => n.id === 'academy')!;

interface AcademyLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const AcademyLayout = ({ title, children }: AcademyLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={academyNav.sub}
    categoryLabel={academyNav.label}
    categoryId={academyNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default AcademyLayout;
