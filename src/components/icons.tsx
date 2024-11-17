import { LucideIcon, Search } from 'lucide-react';

type IconName = 'search';

interface IconsProps {
    name: IconName,
    size: number,
    className?: string;
}

const Icons: React.FC<IconsProps> = ({ name, size = 24, className}) => {
    const icons: Record<IconName, LucideIcon> = {
        search: Search
    }

    const IconComponent = icons[name];

    return <IconComponent size={size} className={className} />; 
}

export default Icons;