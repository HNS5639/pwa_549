const Title = ({ text, icon }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Icono opcional */}
      {icon && (
        <span className="text-2xl">
          {icon}
        </span>
      )}

      {/* Título */}
      <h1
        className="
          text-lg
          font-light
          tracking-wide
          leading-tight
          text-center
        "
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;