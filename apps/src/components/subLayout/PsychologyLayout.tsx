import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_4.png';
import { NAV_ITEMS } from '../../constants/nav';

const psychologyNav = NAV_ITEMS.find((n) => n.id === 'psychology')!;

interface PsychologyLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const PsychologyLayout = ({ title, children }: PsychologyLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={psychologyNav.sub}
    categoryLabel={psychologyNav.label}
    categoryId={psychologyNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default PsychologyLayout;
