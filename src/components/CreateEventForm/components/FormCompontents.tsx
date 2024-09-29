import { useEffect, useState } from 'react';
import { LatLng } from '../CreateEventForm';
import './FormComponents.style.scss';
import axios from 'axios';

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
    requiredExperience: string;
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

export const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    formData,
    handleInputChange,
}) => {
    return (
        <div className="text-input">
            <label className="text-input__label" htmlFor={name}>
                {label}
            </label>
            <input
                type="text"
                className="text-input__input"
                id={name}
                name={name}
                value={formData[name] as string}
                onChange={handleInputChange}
            />
        </div>
    );
};

export const TextArea: React.FC<
    Omit<TextInputProps, 'handleInputChange'> & {
        handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
> = ({ label, name, formData, handleInputChange }) => {
    return (
        <div className="text-input">
            <label className="text-input__label" htmlFor={name}>
                {label}
            </label>
            <textarea
                className="text-input__input"
                id={name}
                name={name}
                rows={4}
                value={formData[name] as string}
                onChange={handleInputChange}
            />
        </div>
    );
};

export const InfoInput = ({ location, label }: { label: string; location: LatLng }) => {
    const [address, setAddress] = useState<string>('Loading address...');

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const geocodeResponse = await axios.get(
                    'https://maps.googleapis.com/maps/api/geocode/json',
                    {
                        params: {
                            latlng: `${location.lat},${location.lng}`,
                            key: import.meta.env.VITE_MAPS_API_KEY,
                        },
                    }
                );

                console.log(import.meta.env.VITE_MAPS_API_KEY);

                const fetchedAddress =
                    geocodeResponse.data.results[0]?.formatted_address || 'Address not found';
                setAddress(fetchedAddress);
            } catch (error) {
                console.error('Error fetching address:', error);
                setAddress('Error fetching address');
            }
        };

        fetchAddress();
    }, [location]);

    return (
        <div className="text-input">
            <p className="text-input__label">{label}</p>
            <div className="text-input__input">{address}</div>
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
    placeholder = 'Enter a number',
    min,
    max,
}) => {
    return (
        <div className="text-input">
            <label htmlFor={name}>{name}</label>
            <input
                type="number"
                id={name}
                className="text-input__input"
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
    label: string;
    options: DropdownOption<T>[];
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownSelect = <T extends string | number>({
    name,
    value,
    label = '',
    options,
    handleInputChange,
}: DropdownSelectProps<T>) => {
    return (
        <div className="select-input">
            <label className="select-input__label" htmlFor={name}>
                {label}
            </label>
            <select
                className="select-input__input"
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

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
    label,
    id,
    name,
    checked,
    onChange,
}) => {
    return (
        <div className="input-label">
            <label htmlFor={id}>{label}</label>
            <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
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

export const DateTimeField: React.FC<DateTimeFieldProps> = ({
    label,
    id,
    name,
    value,
    onChange,
}) => {
    return (
        <div className="time-input">
            <label className="time-input__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="time-input__input"
                type="datetime-local"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
