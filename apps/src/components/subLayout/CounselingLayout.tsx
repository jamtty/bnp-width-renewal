import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const counselingNav = NAV_ITEMS.find((n) => n.id === 'counseling')!;

interface CounselingLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const CounselingLayout = ({ title, children }: CounselingLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={counselingNav.sub}
    categoryLabel={counselingNav.label}
    categoryId={counselingNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default CounselingLayout;
