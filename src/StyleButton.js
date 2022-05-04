export const StyleButton = ({ active, label, style, onToggle }) => {
  const toggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }
  return (
    <span className={className} onMouseDown={toggle}>
      {label}
    </span>
  );
};
