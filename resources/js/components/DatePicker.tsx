'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

function formatDateDisplay(date: Date | undefined) {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !isNaN(date.getTime());
}

// Simple date formatter for 'YYYY-MM-DD' and 'MM/DD/YYYY'
function formatDateValue(date: Date, format: string): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    if (format === 'YYYY-MM-DD') {
        return `${yyyy}-${mm}-${dd}`;
    }
    if (format === 'MM/DD/YYYY') {
        return `${mm}/${dd}/${yyyy}`;
    }
    // fallback to ISO
    return date.toISOString();
}

export function DatePicker({
    value,
    onChange,
    format = 'YYYY-MM-DD',
    defaultToToday = false,
    disabled = false,
    maxDate,
}: {
    value?: string;
    onChange?: (value: string) => void;
    format?: string;
    defaultToToday?: boolean;
    disabled?: boolean;
    maxDate?: Date;
}) {
    const [open, setOpen] = React.useState(false);
    const controlled = value !== undefined && onChange !== undefined;
    let initialDate: Date | undefined = undefined;
    if (controlled && value) {
        initialDate = new Date(value);
    } else if (defaultToToday) {
        initialDate = new Date();
    }
    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [month, setMonth] = React.useState<Date | undefined>(initialDate);
    const [inputValue, setInputValue] = React.useState(controlled ? formatDateDisplay(initialDate) : formatDateDisplay(initialDate));

    React.useEffect(() => {
        if (controlled && value) {
            const d = new Date(value);
            setDate(d);
            setMonth(d);
            setInputValue(formatDateDisplay(d));
        }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const d = new Date(e.target.value);
        if (isValidDate(d)) {
            if (controlled && onChange) {
                onChange(formatDateValue(d, format));
            } else {
                setDate(d);
                setMonth(d);
            }
        }
    };

    const handleSelect = (d?: Date) => {
        if (!d) return;
        if (controlled && onChange) {
            onChange(formatDateValue(d, format));
        } else {
            setDate(d);
            setMonth(d);
            setInputValue(formatDateDisplay(d));
        }
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    id="date"
                    value={inputValue}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                    disabled={disabled}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2" disabled={disabled}>
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                        <Calendar
                            mode="single"
                            selected={controlled && value ? new Date(value) : date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={handleSelect}
                            {...(maxDate ? { disabled: { after: maxDate } } : {})}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
