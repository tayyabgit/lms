import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
interface ComponentProps {
    value: string;
    onValueChange: (value: string) => void;
    processing?: boolean;
    disabled?: boolean;
    classname?: string;
    id?: string;
}

export default function SectionDropdown(props: ComponentProps) {
    const sections = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));
    return (
        <Select {...props}>
            <SelectTrigger>
                <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
                {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                        {section}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
