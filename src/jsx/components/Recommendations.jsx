import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

function Recommendations({ headline, recommendation_list }) {
  const containerRef = useRef();
  const isVisible = useIsVisible(containerRef, { once: true });

  return (
    <div className={`recommendations_container ${(isVisible) ? 'visible' : ''}`} ref={containerRef}>
      <h3>{headline}</h3>
      <ul>
        {recommendation_list && recommendation_list.map((el, i) => (
          <li key={el}>
            <div className="list_indicator">{i + 1}</div>
            <div className="list_text">{el}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Recommendations.propTypes = {
  headline: PropTypes.string.isRequired,
  recommendation_list: PropTypes.instanceOf(Array).isRequired
};

export default memo(Recommendations);
