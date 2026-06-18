const FormFields = ({ formData, handleChange, t }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            {t.placeHolder.titulo}
          </label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t.placeHolder.titulo}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            Categoría
          </label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
          >
            <option value="vegano">{t.placeHolder.vegano}</option>
            <option value="vegetariano">{t.placeHolder.vegetariano}</option>
            <option value="carne_roja">{t.placeHolder.carneRoja}</option>
            <option value="carne_blanca">{t.placeHolder.carneBlanca}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-700">
          {t.description}
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-3 border-2 border-gray-200 rounded-xl h-28 focus:border-orange-500 outline-none resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            {t.placeHolder.tiempo}
          </label>

          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700">
            {t.placeHolder.porciones}
          </label>

          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            className="p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-3 md:mt-6">
          <input
            type="checkbox"
            name="isGlutenFree"
            checked={formData.isGlutenFree}
            onChange={handleChange}
            className="w-5 h-5"
          />

          <label className="text-sm font-bold text-gray-700">
            {t.gluten}
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-700">
          {t.placeHolder.ingredientes}
        </label>

        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder={t.placeHolder.ingredients}
          className="p-3 border-2 border-gray-200 rounded-xl h-24 focus:border-orange-500 outline-none resize-none"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-700">
          {t.preparation}
        </label>

        <textarea
          name="instruction"
          value={formData.instruction}
          onChange={handleChange}
          className="p-3 border-2 border-gray-200 rounded-xl h-40 focus:border-orange-500 outline-none resize-none"
          required
        />
      </div>
    </>
  );
};

export default FormFields;