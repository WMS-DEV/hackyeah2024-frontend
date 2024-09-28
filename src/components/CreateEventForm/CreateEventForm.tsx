import React, { useState } from "react";
import './CreateEventForm.scss';
import { Category, FormData, StringOption, TextInput, DropdownSelect, DateTimeField, NumberInput, CheckboxField } from "./components/FormCompontents";
import { createEvent } from "../../api/backendApi";

interface CreateEventFormProps {
    latitude: number;
    longitude: number;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ latitude = 50.06772, longitude = 19.99154 }) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await createEvent({
            name: formData.eventName,
            categoryId: formData.categoryId,
            description: formData.description,
            creatorId: 1,
            startTimestamp: Date.parse(formData.startTimestamp),
            endTimestamp: Date.parse(formData.endTimestamp),
            cyclic: formData.cyclic,
            maxNumberOfParticipants: formData.maxParticipants,
            invitedEmails: [],
            isPublic: formData.isPublic,
            requieredExperience: formData.requieredExperience,
            age: formData.age,
            latitude,
            longitude,
        });

        console.log('latitude', latitude);
        console.log('longitude', longitude);
        console.log("Form submitted:", formData);
        console.log('Result:', result);
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

            <button type="submit" className="submit-button">Create</button>
        </form>
    );
};

export default CreateEventForm;
