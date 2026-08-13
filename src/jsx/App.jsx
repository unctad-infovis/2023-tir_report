import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

import Video from './components/Video.jsx';
import PageNavigation from './components/PageNavigation.jsx';
import Quote from './components/Quote.jsx';
import ProgressIndicator from './components/ProgressIndicator.jsx';
import PhotoHeadline from './components/PhotoHeadline.jsx';
import Recommendations from './components/Recommendations.jsx';
import Footer from './components/Footer.jsx';

import Figure1 from './Figure1.jsx';
import Figure2 from './Figure2.jsx';
import Figure3 from './Figure3.jsx';
import Figure4 from './Figure4.jsx';
import Table1 from './Table1.jsx';

// const appID = '#app-root-2023-tir_report';

function App() {
  const appRef = useRef();
  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();

  const [section1Seen, setSection1Seen] = useState(false);
  const [section2Seen, setSection2Seen] = useState(false);
  const [section3Seen, setSection3Seen] = useState(false);
  const [section4Seen, setSection4Seen] = useState(false);

  const [section1Progress, setSection1Progress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Progress, setSection4Progress] = useState(0);

  const [offset, setOffset] = useState(false);
  // Data states.
  // const [data, setData] = useState(false);

  const highlightRef1 = useRef();
  const highlightRef2 = useRef();
  const highlightRef3 = useRef();
  const highlightRef4 = useRef();
  const highlightRef5 = useRef();
  const highlightRef6 = useRef();
  const highlightRef7 = useRef();
  const highlightRef8 = useRef();
  const highlightRef9 = useRef();
  const highlightRef10 = useRef();
  const highlightRef11 = useRef();
  const highlightRef12 = useRef();
  const highlightRef13 = useRef();
  const highlightRef14 = useRef();
  const highlightRef15 = useRef();
  const highlightRef16 = useRef();
  const highlightVisible1 = useIsVisible(highlightRef1, { once: true });
  const highlightVisible2 = useIsVisible(highlightRef2, { once: true });
  const highlightVisible3 = useIsVisible(highlightRef3, { once: true });
  const highlightVisible4 = useIsVisible(highlightRef4, { once: true });
  const highlightVisible5 = useIsVisible(highlightRef5, { once: true });
  const highlightVisible6 = useIsVisible(highlightRef6, { once: true });
  const highlightVisible7 = useIsVisible(highlightRef7, { once: true });
  const highlightVisible8 = useIsVisible(highlightRef8, { once: true });
  const highlightVisible9 = useIsVisible(highlightRef9, { once: true });
  const highlightVisible10 = useIsVisible(highlightRef10, { once: true });
  const highlightVisible11 = useIsVisible(highlightRef11, { once: true });
  const highlightVisible12 = useIsVisible(highlightRef12, { once: true });
  const highlightVisible13 = useIsVisible(highlightRef13, { once: true });
  const highlightVisible14 = useIsVisible(highlightRef14, { once: true });
  const highlightVisible15 = useIsVisible(highlightRef15, { once: true });
  const highlightVisible16 = useIsVisible(highlightRef16, { once: true });

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const windowHeight = 0;
    setSection1Progress((offset > section1.current.offsetTop - windowHeight) ? (Math.min(((offset - (section1.current.offsetTop - windowHeight)) / section1.current.offsetHeight) * 100, 100)) : 0);
    setSection2Progress((offset > section2.current.offsetTop - windowHeight) ? (Math.min(((offset - (section2.current.offsetTop - windowHeight)) / section2.current.offsetHeight) * 100, 100)) : 0);
    setSection3Progress((offset > section3.current.offsetTop - windowHeight) ? (Math.min(((offset - (section3.current.offsetTop - windowHeight)) / section3.current.offsetHeight) * 100, 100)) : 0);
    setSection4Progress((offset > section4.current.offsetTop - windowHeight) ? (Math.min(((offset - (section3.current.offsetTop - windowHeight)) / section3.current.offsetHeight) * 100, 100)) : 0);
  }, [offset]);

  const analytics = window.gtag || undefined;
  const track = useCallback((label_event = false, value_event = false) => {
    if (typeof analytics !== 'undefined' && label_event !== false && value_event !== false) {
      analytics('event', 'project_interaction', {
        label: label_event,
        project_name: '2023-tir_report',
        transport_type: 'beacon',
        value: value_event
      });
    }
  }, [analytics]);

  useEffect(() => {
    if (section1Progress === 100 && section1Seen === false) {
      setSection1Seen(true);
      track('Scroll', 'Section 1');
    }
  }, [section1Progress, section1Seen, track]);

  useEffect(() => {
    if (section2Progress === 100 && section2Seen === false) {
      setSection2Seen(true);
      track('Scroll', 'Section 2');
    }
  }, [section2Progress, section2Seen, track]);

  useEffect(() => {
    if (section3Progress === 100 && section3Seen === false) {
      setSection3Seen(true);
      track('Scroll', 'Section 3');
    }
  }, [section3Progress, section3Seen, track]);

  useEffect(() => {
    if (section4Progress === 100 && section4Seen === false) {
      setSection4Seen(true);
      track('Scroll', 'Section 4');
    }
  }, [section4Progress, section4Seen, track]);

  const anchorClick = (target, name) => {
    track('Navigation Click', name);
    setTimeout(() => {
      scrollIntoView(appRef.current.querySelector(target), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 30
        },
        cancellable: false,
        time: 1000
      });
    }, 50);
  };

  return (
    <div className="app" ref={appRef}>
      <Video anchorClick={anchorClick} />
      <PageNavigation appRef={appRef} />
      <div className="two_column_layout center">
        <div className="left_column">
          <div className="text_container">
            <p className="ingress">
              The Technology and Innovation Report 2023 highlights the opportunities that green innovation – goods and services with smaller carbon footprints – offer developing countries to spur economic growth and enhance technological capacities.
            </p>
            <p className="ingress">The report analyses the market size of 17 green and frontier technologies, such as artificial intelligence, the Internet of Things and electric vehicles, and their potential to create jobs.</p>
            <p className="ingress" ref={highlightRef1}>
              <span className={`highlight ${(highlightVisible1) ? 'visible' : ''}`}>Now is the time for developing countries to capture more of the value being created in this green tech revolution</span>
              {' '}
              – and use it to grow their economies, make them more resilient to shocks and reduce inequalities.
            </p>
            <p className="ingress" ref={highlightRef2}>
              UNCTAD calls on their governments and business communities to
              {' '}
              <span className={`highlight ${(highlightVisible2) ? 'visible' : ''}`}>invest in more complex and greener sectors, boost technical skills and scale up investments</span>
              {' '}
              in the technology infrastructure needed to grow green industries.
            </p>
            <p className="ingress">To support this evolution, the report urges the international community to make global trade rules more supportive of emerging green industries in developing economies and reform intellectual property rights to facilitate technology transfer to these countries.</p>
          </div>
        </div>
        <div className="right_column">
          <Quote author_name="Rebeca Grynspan" author_title="UNCTAD Secretary-General" first_line="We are at the beginning of a green technological revolution." second_line="If developing countries act now to catch this wave, they can grow stronger economies while tackling climate change." />
        </div>
      </div>
      <div className="section_wrapper">
        <ProgressIndicator appRef={appRef} section1Progress={section1Progress} section2Progress={section2Progress} section3Progress={section3Progress} section4Progress={section4Progress} />
        {/* Section 1 */}
        <div ref={section1} className="section_1_container">
          <PhotoHeadline img="2023-tir_report_section_1-min.jpg" max_width={560} text_upper="The green tech gap" text_lower="between countries is widening" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p ref={highlightRef3}>
                  We are at the beginning of a technological revolution based on green and Industry 4.0 technologies – and developing countries must catch the wave early. As shown in previous technological revolutions,
                  {' '}
                  <span className={`highlight ${(highlightVisible3) ? 'visible' : ''}`}>early adopters can move ahead quicker and reap the advantages for longer.</span>
                </p>
                <p>Now is the moment for developing countries to take advantage of the high increases in productivity associated with this new technological revolution and catch up economically, while helping to protect the planet.</p>
                <p>Missing this green technological wave because of insufficient policy attention or a lack of investment targeted at building skills and capacities would have long-lasting negative consequences.</p>
                <p ref={highlightRef4}>
                  <span className={`highlight ${(highlightVisible4) ? 'visible' : ''}`}>The 17 frontier technologies covered in the report</span>
                  {' '}
                  such as artificial intelligence, Internet of Things and green hydrogen already represent a $1.5 trillion market, which could grow to over $9.5 trillion by 2030 – about three times the current size of the Indian economy.
                </p>
                <p ref={highlightRef5}>
                  <span className={`highlight ${(highlightVisible5) ? 'visible' : ''}`}>But so far, developed economies are seizing most of the opportunities</span>
                  , leaving developing economies further behind.
                </p>
                <p ref={highlightRef6}>
                  The total exports of green technologies from developed countries jumped from around $60 billion in 2018 to over $156 billion in 2021. In the same period, exports from developing nations rose from a similar starting line of $57 billion to only about $75 billion.
                  {' '}
                  <span className={`highlight ${(highlightVisible6) ? 'visible' : ''}`}>In three years, developing countries’ share of global exports has fallen from over 48% to under 33%.</span>
                </p>
              </div>
            </div>
            <div className="right_column">
              <Figure1 />
            </div>
          </div>
          <Figure2 />
        </div>
        {/* Section 2 */}
        <div ref={section2} className="section_2_container">
          <PhotoHeadline img="2023-tir_report_section_2-min.jpg" max_width={560} text_upper="Developing countries are" text_lower="least ready to harness frontier technologies" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p>Frontier technologies can increase productivity and improve livelihoods. For example, artificial intelligence combined with robotics can transform production systems, while 3D printing allows faster and cheaper low-volume manufacturing.</p>
                <p ref={highlightRef7}>
                  <span className={`highlight ${(highlightVisible7) ? 'visible' : ''}`}>But few developing countries have the capacities needed to take advantage of frontier technologies</span>
                  , which rely on digitalization and connectivity. They include blockchain, drones, gene editing, nanotechnology and solar power.
                </p>
                <p>The report assesses countries’ preparedness for frontier technologies. It presents a “readiness index” ranking 166 countries based on five “building blocks”: ICT deployment, skills, research and development (R&D) activity, industry activity and access to finance.</p>
                <p ref={highlightRef8}>
                  <span className={`highlight ${(highlightVisible8) ? 'visible' : ''}`}>The index shows that countries in Latin America, the Caribbean and sub-Saharan Africa are the least ready</span>
                  {' '}
                  to use, adopt or adapt to frontier technologies and are at risk of missing current technological opportunities.
                </p>
                <p ref={highlightRef9}>
                  In general, those most ready are high-income economies, notably the United States, Sweden, Singapore, Switzerland and the Netherlands.
                  {' '}
                  <span className={`highlight ${(highlightVisible9) ? 'visible' : ''}`}>China, the most-ready developing country, ranked 35, followed by Brazil (40), India (46) and South Africa (56).</span>
                </p>
                <p>China&apos;s lower-than-expected position, when compared to its capacities to produce and innovate in frontier technologies, is due primarily to urban-rural disparities in internet coverage and broadband speed.</p>
              </div>
            </div>
            <div className="right_column">
              <Figure3 />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div ref={section3} className="section_3_container">
          <PhotoHeadline img="2023-tir_report_section_3-min.jpg" max_width={580} text_upper="But developing countries can" text_lower="catch up on frontier technologies" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p ref={highlightRef10}>
                  The report highlights that
                  {' '}
                  <span className={`highlight ${(highlightVisible10) ? 'visible' : ''}`}>developing countries can use frontier technologies to leapfrog previous innovations</span>
                  {' '}
                  and quickly move ahead, providing examples of those already doing so.
                </p>
                <p ref={highlightRef11}>
                  The readiness index shows, for example, that
                  {' '}
                  <span className={`highlight ${(highlightVisible11) ? 'visible' : ''}`}>some developing countries in Asia – notably India, the Philippines and Viet Nam – are performing better than expected.</span>
                </p>
                <p>Their overperformance is measured as the difference between the actual index rankings and the projected rankings based on per capita income. In general, it results from increased investment in infrastructure, enhanced technical skills and a conducive business climate.</p>
                <p ref={highlightRef12}>
                  <span className={`highlight ${(highlightVisible12) ? 'visible' : ''}`}>India remains the greatest overperformer</span>
                  {' '}
                  ranking at 67 positions better than expected, followed by the Philippines (54 positions better) and Viet Nam (44 better).
                </p>
                <p>India performs well for R&D and ICT. This reflects their abundant supplies of qualified and highly skilled human resources available at a comparatively low cost.</p>
                <p ref={highlightRef13}>
                  <span className={`highlight ${(highlightVisible13) ? 'visible' : ''}`}>The Philippines and Viet Nam have a high ranking for industry.</span>
                  {' '}
                  This reflects high levels of foreign direct investment in high-technology manufacturing, particularly electronics.
                </p>
              </div>
            </div>
            <div className="right_column">
              <Figure4 />
            </div>
          </div>
          <Recommendations headline="UNCTAD calls on governments in developing countries to" recommendation_list={['Invest in more complex and greener sectors through policy instruments such as clusters, smart specialization initiatives and demonstration projects.', 'Boost technical skills, scale up investments in ICT infrastructure and address connectivity gaps between small and large firms and between urban and rural regions.', 'Build capacities to harness frontier technologies. Otherwise, the green technological revolution will not close but widen global inequalities.']} />
        </div>
        {/* Section 4 */}
        <div ref={section4} className="section_4_container">
          <PhotoHeadline img="2023-tir_report_section_4-min.jpg" max_width={580} text_upper="Developing countries need" text_lower="better policies and fairer trade rules" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p ref={highlightRef14}>
                  Green innovation opportunities are time-bound and
                  {' '}
                  <span className={`highlight ${(highlightVisible14) ? 'visible' : ''}`}>can only be seized through changes in policy</span>
                  , without which the windows may close.
                </p>
                <p>Countries that have taken advantage of the opportunities, such as Brazil and China, have done so through strong responses that include government policies, like China’s 2006 renewable energy law that stimulated the initial development of the biomass industry. It was supported by solar energy subsidies, demonstration programmes and private sector initiatives.</p>
                <p ref={highlightRef15}>
                  If developing countries are to capture the economic gains associated with new technologies,
                  {' '}
                  <span className={`highlight ${(highlightVisible15) ? 'visible' : ''}`}>their firms must have the required capabilities.</span>
                  {' '}
                  This includes not just scientific or technical skills but also the necessary policies, regulations and infrastructure.
                </p>
                <p ref={highlightRef16}>
                  But developing countries can’t take advantage of green windows of opportunity on their own.
                  {' '}
                  <span className={`highlight ${(highlightVisible16) ? 'visible' : ''}`}>They need an enabling international economy</span>
                  , in which trade rules are consistent with the Paris Agreement on climate change. Otherwise, new green sectors will struggle to emerge and grow in developing economies, and cleaner and more productive production will remain out of their reach.
                </p>
              </div>
            </div>
            <div className="right_column">
              <Table1 />
            </div>
          </div>
        </div>
        <Recommendations headline="UNCTAD calls for" recommendation_list={['Governments and the global community to ensure consistency across international agreements on trade, intellectual property and climate change to close the green tech gap.', 'Governments to align environmental, science, technology, innovation and industrial policies.', 'Greater cooperation through international trade. Trade rules should permit developing countries to protect nascent green industries through tariffs, subsidies and public procurement.', 'A global initiative to provide information on products with lower carbon footprints to inform trade rules. And a multilateral fund to stimulate green innovations.']} />
      </div>
      <Footer />
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
