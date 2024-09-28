import React, { useState } from "react";
import './CreateEventForm.scss';

interface DropdownOption<T> {
    value: T;
    label: string;
}

type Category = DropdownOption<number>;

type StringOption = DropdownOption<string>;

interface FormData {
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

interface TextInputProps {
    label: string;
    name: keyof FormData;
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, formData, handleInputChange }) => {
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

interface NumberInputProps {
    name: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    min?: number;
    max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
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

interface DropdownSelectProps<T> {
    name: string;
    value: T;
    options: DropdownOption<T>[];
    handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownSelect = <T extends string | number>({
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

interface CheckboxFieldProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, name, checked, onChange }) => {
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

interface DateTimeFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({ label, id, name, value, onChange }) => {
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

const CreateEventForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        eventName: "",
        categoryId: -1,
        description: "",
        startTimestamp: "",
        endTimestamp: "",
        cyclic: "NONE",
        maxParticipants: 2,
        isPublic: true,
        invitedEmails: [],
        requieredExperience: "",
        age: "",
        longitude: 0,
        latitude: 0,
    });

    const categories: Array<Category> = [
        { value: 1, label: "Category 1" },
        { value: 2, label: "Category 2" },
        { value: 3, label: "Category 3" },
    ];

    const cyclicOptions: Array<StringOption> = [
        { value: "NONE", label: "None" },
        { value: "DAILY", label: "Daily" },
        { value: "WEEKLY", label: "Weekly" },
        { value: "MONTHLY", label: "Monthly" },
    ];

    const ageOptions: Array<StringOption> = [
        { value: "ALL", label: "All" },
        { value: "CHILDREN", label: "Children" },
        { value: "ADULTS", label: "Adults" },
    ];

    const experienceOptions: Array<StringOption> = [
        { value: "NOVICE", label: "Novice" },
        { value: "INTERMEDIATE", label: "Intermediate" },
        { value: "ADVANCED", label: "Advanced" },
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const target = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create event</h2>

            <TextInput
                label="Event name"
                name="eventName"
                formData={formData}
                handleInputChange={handleInputChange}
            />

            <TextInput
                label="Description"
                name="description"
                formData={formData}
                handleInputChange={handleInputChange}
            />

            <DropdownSelect
                name="categoryId"
                value={formData.categoryId}
                options={categories}
                handleInputChange={handleInputChange}
            />

            <DateTimeField
                label="Start time"
                id="startTimestamp"
                name="startTimestamp"
                value={formData.startTimestamp}
                onChange={handleInputChange}
            />

            <DateTimeField
                label="End time"
                id="endTimestamp"
                name="endTimestamp"
                value={formData.endTimestamp}
                onChange={handleInputChange}
            />

            <DropdownSelect
                name="cyclic"
                value={formData.cyclic}
                options={cyclicOptions}
                handleInputChange={handleInputChange}
            />

            <NumberInput
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                placeholder="Max participants"
                min={2}
                max={50}
            />

            <DropdownSelect
                name="age"
                value={formData.age}
                options={ageOptions}
                handleInputChange={handleInputChange}
            />

            <DropdownSelect
                name="requieredExperience"
                value={formData.requieredExperience}
                options={experienceOptions}
                handleInputChange={handleInputChange}
            />

            <CheckboxField
                label="Is public"
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleInputChange}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateEventForm;
