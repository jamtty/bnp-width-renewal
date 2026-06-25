import SubLayout from './SubLayout';
import subVisBg from '../../assets/images/bg_subvis_1.png';
import { NAV_ITEMS } from '../../constants/nav';

const boardNav = NAV_ITEMS.find((n) => n.id === 'board')!;

interface BoardLayoutProps {
  title: string;
  children?: React.ReactNode;
}

const BoardLayout = ({ title, children }: BoardLayoutProps) => (
  <SubLayout
    bgImage={subVisBg}
    lnbItems={boardNav.sub}
    categoryLabel={boardNav.label}
    categoryId={boardNav.id}
    title={title}
  >
    {children}
  </SubLayout>
);

export default BoardLayout;
