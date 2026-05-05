const Title = ({ text, icon }) => {
  return (
    <div className="font-bold text-lg">
      {icon && <span className="title-icon">{icon}</span>}
      <h2 className="text-2xl font-bold text-gray-900">{text}</h2>
    </div>
  );
};
export default Title;