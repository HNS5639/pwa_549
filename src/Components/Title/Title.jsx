import './Styles.css';

export const Title = ({ text, icon }) => {
  return (
    <div className="title-container">
      {icon && <span className="title-icon">{icon}</span>}
      <h1 className="main-title">{text}</h1>
    </div>
  );
};