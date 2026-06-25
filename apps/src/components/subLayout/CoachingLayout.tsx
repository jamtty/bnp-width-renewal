import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const coachingNav = NAV_ITEMS.find((n) => n.id === 'coaching')!;

interface CoachingLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const CoachingLayout = ({ title, children }: CoachingLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={coachingNav.sub}
    categoryLabel={coachingNav.label}
    categoryId={coachingNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default CoachingLayout;
