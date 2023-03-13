import React, { /* useState,  useEffect, useRef */ memo } from 'react';

const analytics = window.gtag || undefined;

function Footer() {
  const track = (name) => {
    if (typeof analytics !== 'undefined') {
      analytics('event', 'Press material', {
        event_category: '2023-tir_report',
        event_label: name,
        transport_type: 'beacon'
      });
    }
  };
  return (
    <div className="footer_container">
      <h2>What do you want to do next?</h2>
      <div className="download_button anchor_downloads"><a href="https://unctad.org/publication/technology-and-innovation-report-2023">Download the report</a></div>
      <div className="footer_elements">
        <div className="footer_element footer_element_1 anchor_video">
          <div className="footer_content">
            <h3>Watch the video</h3>
            <div className="iframe_container youtube_iframe">
              <iframe src="" title="UNCTAD’s Review of Trade and Innovation 2023" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <ul>
              <li>
                <a href="#video" target="_blank" rel="noreferrer">Français</a>
                {', '}
                <a href="#video" target="_blank" rel="noreferrer">Español</a>
                {', '}
                <a href="#video" target="_blank" rel="noreferrer">العربية</a>
                {', '}
                <a href="#video" target="_blank" rel="noreferrer">简体中文</a>
                {', '}
                <a href="#video" target="_blank" rel="noreferrer">Русский</a>
                {', '}
                <a href="#video" target="_blank" rel="noreferrer">Português</a>
              </li>
            </ul>
          </div>
          <div className="footer_content anchor_podcasts">
            <h3>Podcast</h3>
            <p>Listen to the Weekly Tradecast episodes that explore some of the main issues in the report</p>
            <div className="iframe_container">
              <iframe title="17. Sea of trouble: Turning our ships gree" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=t25dz-12f9d19-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
            </div>
          </div>
        </div>
        <div className="footer_element footer_element_2">
          <div className="footer_content anchor_press">
            <h3>Press material</h3>
            <ul>
              <li>
                <h4>Press conference</h4>
                <div className="iframe_container youtube_iframe">
                  <iframe src="" title="UNCTAD’s Review of Trade and Innovation 2023: press conference" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <h4>Download the report video</h4>
                <ul>
                  <li>
                    <a href="#video" target="_blank" rel="noreferrer">English</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">Français</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">Español</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">العربية</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">简体中文</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">Русский</a>
                    {', '}
                    <a href="#video" target="_blank" rel="noreferrer">Português</a>
                  </li>
                </ul>
              </li>
              <li>
                <h4>Read the global press release</h4>
                <ul>
                  <li>
                    <a href="#press" onClick={(event) => track(event.target.href)}>English</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>Français</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>Español</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>العربية</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>简体中文</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>Русский</a>
                    {', '}
                    <a href="#press" onClick={(event) => track(event.target.href)}>Português</a>
                  </li>
                </ul>
              </li>
            </ul>
            <h4><a href="https://unctad.org/publication/technology-and-innovation-report-2023">Download the report</a></h4>
            <div><a href="https://unctad.org/publication/technology-and-innovation-report-2023"><img src={`${window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2023-tir_report/' : './'}assets/img/2023-tir_report_cover.png`} alt="TIR 2023 Cover" /></a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
