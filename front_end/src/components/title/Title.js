// internal Imports
import "./Title.style.css";

const Title = ({ title }) => {
  return (
    <>
      <div className="title">
        <h1 className="titleName">{title}</h1>
      </div>
    </>
  );
};

export default Title;
