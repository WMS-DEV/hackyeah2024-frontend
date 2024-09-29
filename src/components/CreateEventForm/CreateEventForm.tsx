import React, { useState, useEffect } from "react";
import "./CreateEventForm.scss";
import {
  Category,
  FormData,
  StringOption,
  TextInput,
  DropdownSelect,
  DateTimeField,
  NumberInput,
} from "./components/FormCompontents";
import { createEvent, getCategoryList } from "../../api/backendApi";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../providers/EventsProvider/EventsProvider";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";

type LatLng = {
  lat: number;
  lng: number;
};

interface CreateEventFormProps {
  location: LatLng;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ location }) => {
  const navigate = useNavigate();

  const { removeDrafts } = useEvents();
  const { setVisibility } = useSlider();

  useEffect(() => {
    const fetchData = async () => {
      const results = await getCategoryList();
      setCategories(
        results.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      );
    };

    fetchData();
  }, []);

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
    requiredExperience: "",
    age: "",
    longitude: 0,
    latitude: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const cyclicOptions: Array<StringOption> = [
    { value: "NONE", label: "One time" },
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
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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

    try {
      const result = await createEvent({
        name: formData.eventName,
        categoryId: formData.categoryId,
        description: formData.description,
        creatorId: 1,
        startTime: Date.parse(formData.startTimestamp),
        endTime: Date.parse(formData.endTimestamp),
        cyclic: formData.cyclic,
        maxNumberOfParticipants: formData.maxParticipants,
        invitedEmails: [],
        isPublic: formData.isPublic,
        requiredExperience: formData.requiredExperience,
        age: formData.age,
        latitude: location.lat,
        longitude: location.lng,
      });

      console.log("latitude", location.lat);
      console.log("longitude", location.lng);
      console.log("Form submitted:", formData);
      console.log("Result:", result);
    } catch (error) {
      alert("Error creating event. Please check your data and try again.");
    }

    removeDrafts();
    setVisibility(false);
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create event</h2>

      <TextInput
        label="Event name"
        name="eventName"
        formData={formData}
        placeholder="Casual football match"
        handleInputChange={handleInputChange}
      />

      <TextInput
        label="Description"
        name="description"
        formData={formData}
        placeholder="Playing football in a good company"
        handleInputChange={handleInputChange}
      />

      <DropdownSelect
        name="categoryId"
        value={formData.categoryId}
        options={categories}
        label="Category"
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
        label="Cyclic"
        handleInputChange={handleInputChange}
      />

      <NumberInput
        name="maxParticipants"
        value={formData.maxParticipants}
        onChange={handleInputChange}
        placeholder="Max participants"
        min={2}
        max={50}
        label="Max number of participants"
      />

      <DropdownSelect
        name="age"
        value={formData.age}
        options={ageOptions}
        label="Age groups"
        handleInputChange={handleInputChange}
      />

      <DropdownSelect
        name="requiredExperience"
        value={formData.requiredExperience}
        options={experienceOptions}
        label="Skill level"
        handleInputChange={handleInputChange}
      />

      <button type="submit" className="submit-button">
        Create
      </button>
    </form>
  );
};

export default CreateEventForm;
