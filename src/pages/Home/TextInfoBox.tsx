import "./TextInfoBox.scss";

export interface TextInfoBoxProps {
  label: string;
  value: string;
}

export const TextInfoBox = ({ label, value }: TextInfoBoxProps) => {
  return (
    <div className="textinfobox">
      <div className="textinfobox__label">{label}</div>
      <div className="textinfobox__value">{value}</div>
    </div>
  );
};

export const AccentTextInfoBox = ({ label, value }: TextInfoBoxProps) => {
  return (
    <div className="textinfobox">
      <div className="textinfobox__label--accent">{label}</div>
      <div className="textinfobox__value--accent">{value}</div>
    </div>
  );
};
