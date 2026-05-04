const Title = ({ text, icon }) => {
  return (
    <div className="font-bold text-lg">
      {icon && <span className="title-icon">{icon}</span>}
      <h1 className="main-title">{text}</h1>
    </div>
  );
};
export default Title;