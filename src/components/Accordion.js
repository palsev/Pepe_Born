import React, { useState } from 'react';
import '../css/react-base.css';

function Accordion(props) {
  const [isActive, setIsActive] = useState(false);

  function toggleAccordion() {
    setIsActive(!isActive);
  }

  return (
    <div className='faq_accordion'>
      <button className={`accordion ${isActive ? 'active' : ''} text-lg font-bold text-gray-600 rounded-xl my-5`} onClick={toggleAccordion}  style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white"}}>{props.title}</button>
      <div className="text-left panel text-sm text-gray-400 rounded-xl" style={{ display: isActive ? 'block' : 'none', backgroundColor: "rgba(0, 0, 0, 0.25)" }}>
        {props.content}
      </div>
    </div>
  );
}

export default Accordion;
