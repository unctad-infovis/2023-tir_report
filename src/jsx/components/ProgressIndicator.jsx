import React, { /* useState, useEffect, useRef */ memo } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

const analytics = window.gtag || undefined;

function ProgressIndicator({
  appRef, section1Progress, section2Progress, section3Progress, section4Progress
}) {
  const track = (name) => {
    if (typeof analytics !== 'undefined') {
      analytics('event', 'Progress Indicator Click', {
        event_category: '2023-tir_report',
        event_label: name,
        transport_type: 'beacon'
      });
    }
  };
  const anchorClick = (target, name) => {
    track(name);
    setTimeout(() => {
      scrollIntoView(appRef.current.querySelector(target), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 0
        },
        cancellable: false,
        time: 1000
      });
    }, 50);
  };
  return (
    <div className="progress_indicator_container" style={{ top: `${window.location.href.includes('unctad.org') ? '0' : '0'}` }}>
      <button type="button" className="section" onClick={() => anchorClick('.section_1_container', 'Section 1')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section1Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_2_container', 'Section 2')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section2Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_3_container', 'Section 3')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section3Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_4_container', 'Section 4')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section4Progress}%` }} />
        }
      </button>
    </div>
  );
}

ProgressIndicator.propTypes = {
  appRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  section1Progress: PropTypes.number,
  section2Progress: PropTypes.number,
  section3Progress: PropTypes.number,
  section4Progress: PropTypes.number
};

ProgressIndicator.defaultProps = {
  section1Progress: 0,
  section2Progress: 0,
  section3Progress: 0,
  section4Progress: 0
};

export default memo(ProgressIndicator);
