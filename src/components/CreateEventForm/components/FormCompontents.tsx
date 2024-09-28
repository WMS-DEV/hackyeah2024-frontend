import '../CreateEventForm.scss';

export interface FormData {
    eventName: string;
    categoryId: number;
    description: string;
    startTimestamp: string;
    endTimestamp: string;
    cyclic: string;
    maxParticipants: number;
    isPublic: boolean;
    invitedEmails: Array<string>;
    requieredExperience: string;
    age: string;
    longitude: number;
    latitude: number;
}

export interface DropdownOption<T> {
    value: T;
    label: string;
}

export type Category = DropdownOption<number>;

export type StringOption = DropdownOption<string>;

export interface TextInputProps {
    label: string;
    name: keyof FormData;
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ label, name, formData, handleInputChange }) => {
    return (
        <div className="input-label">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                id={name}
                name={name}
                value={formData[name] as string}
                onChange={handleInputChange}
                placeholder="Casual football match"
            />
        </div>
    );
};

export interface NumberInputProps {
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    min?: number;
    max?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
    name,
    value,
    onChange,
    placeholder = "Enter a number",
    min,
    max,
}) => {
    return (
        <div className="input-label" style={{ marginTop: '15px' }}>
            <label htmlFor={name}>{name}</label>
            <input
                type="number"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                step="1"
            />
        </div>
    );
};

export interface DropdownSelectProps<T> {
    name: string;
    value: T;
    options: DropdownOption<T>[];
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownSelect = <T extends string | number>({
    name,
    value,
    options,
    handleInputChange,
}: DropdownSelectProps<T>) => {
    return (
        <div className="select-wrapper">
            <label htmlFor={name}>Dropdown/Autocomplete</label>
            <select
                className="custom-select"
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="select-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffffff"
                >
                    <path
                        d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export interface CheckboxFieldProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, name, checked, onChange }) => {
    return (
        <div className="input-label">
            <label htmlFor={id}>{label}</label>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};

export interface DateTimeFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateTimeField: React.FC<DateTimeFieldProps> = ({ label, id, name, value, onChange }) => {
    return (
        <div className="input-label">
            <label htmlFor={id}>{label}</label>
            <input
                type="datetime-local"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};