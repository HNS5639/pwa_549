import { useState } from "react";
import { useNavigate } from "react-router";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

import FormFields from "../FormFields/FormFields";

function Form() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const t = texts[lang];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    servings: "",
    type: "carne_blanca",
    isGlutenFree: false,
    ingredients: "",
    instructions: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    navigate("/");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      buttonText={t.placeHolder.save}
    >
      <RecipeFormFields
        formData={formData}
        handleChange={handleChange}
        t={t}
      />
    </Form>
  );
}

export default Form;