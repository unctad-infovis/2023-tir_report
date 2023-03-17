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
              <iframe src="https://www.youtube.com/embed/w1i5vownQzI" title="Technology and Innovation Report 2023" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <ul>
              <li>
                <a href="https://youtu.be/wb96xSQvfSU" target="_blank" rel="noreferrer">Français</a>
                {', '}
                <a href="https://youtu.be/N0YFDJH6RxI" target="_blank" rel="noreferrer">Español</a>
                {', '}
                <a href="https://youtu.be/SZ-Q4KBMOHc" target="_blank" rel="noreferrer">العربية</a>
                {', '}
                <a href="https://youtu.be/mORIGqe6GiI" target="_blank" rel="noreferrer">简体中文</a>
                {', '}
                <a href="https://youtu.be/eUXNPr_F0tU" target="_blank" rel="noreferrer">Русский</a>
                {', '}
                <a href="https://youtu.be/CgcFhjszL3g" target="_blank" rel="noreferrer">Português</a>
                {', '}
                <a href="https://youtu.be/AmWLHHtkD8E" target="_blank" rel="noreferrer">हिंदी</a>
                {', '}
                <a href="https://youtu.be/lFkXI4Lfpfs" target="_blank" rel="noreferrer">Kiswahili</a>
              </li>
            </ul>
          </div>
          <div className="footer_content anchor_podcasts">
            <h3>Podcast</h3>
            <p>Listen to the Weekly Tradecast episode that explores some of the main issues in the report</p>
            <div className="iframe_container">
              <iframe title="37. Going green: How technology offers development and climate benefits" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="https://www.podbean.com/player-v2/?i=y46kd-13b94e4-pb&btn-skin=009EDB&download=1&font-color=000000&fonts=Verdana&from=pb6admin&logo_link=none&rtl=0&share=1&size=240&skin=ffffff" allowFullScreen />
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
                  <iframe src="https://www.youtube.com/embed/O1pEfOXWWnE" title="Technology and Innovation Report 2023: press conference" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <h4>Download the report video</h4>
                <ul>
                  <li>
                    <a href="https://vimeo.com/808464387" target="_blank" rel="noreferrer">English</a>
                    {', '}
                    <a href="https://vimeo.com/808616703" target="_blank" rel="noreferrer">Français</a>
                    {', '}
                    <a href="https://vimeo.com/808616962" target="_blank" rel="noreferrer">Español</a>
                    {', '}
                    <a href="https://vimeo.com/808617024" target="_blank" rel="noreferrer">العربية</a>
                    {', '}
                    <a href="https://vimeo.com/808616649" target="_blank" rel="noreferrer">简体中文</a>
                    {', '}
                    <a href="https://vimeo.com/808616903" target="_blank" rel="noreferrer">Русский</a>
                    {', '}
                    <a href="https://vimeo.com/808616846" target="_blank" rel="noreferrer">Português</a>
                    {', '}
                    <a href="https://vimeo.com/808616749" target="_blank" rel="noreferrer">हिंदी</a>
                    {', '}
                    <a href="https://vimeo.com/808616788" target="_blank" rel="noreferrer">Kiswahili</a>
                  </li>
                </ul>
              </li>
              <li>
                <h4>Read the global press release</h4>
                <ul>
                  <li>
                    <a href="https://unctad.org/press-material/unctad-calls-coherent-policy-action-enable-developing-countries-benefit-green" onClick={(event) => track(event.target.href)}>English</a>
                    {', '}
                    <a href="https://unctad.org/fr/press-material/la-cnuced-appelle-des-politiques-coherentes-pour-permettre-aux-pays-en-developpement" onClick={(event) => track(event.target.href)}>Français</a>
                    {', '}
                    <a href="https://unctad.org/es/press-material/la-unctad-pide-coherencia-en-las-politicas-para-que-los-paises-en-desarrollo-puedan" onClick={(event) => track(event.target.href)}>Español</a>
                    {', '}
                    <a href="https://unctad.org/system/files/press-material/PR23004_TIR23_ar_Rev1.pdf" onClick={(event) => track(event.target.href)}>العربية</a>
                    {', '}
                    <a href="https://unctad.org/system/files/press-material/PR23004_TIR23_ch_Rev.1_0.pdf" onClick={(event) => track(event.target.href)}>简体中文</a>
                    {', '}
                    <a href="https://unctad.org/system/files/press-material/PR23004_TIR23_ru_Rev.1_0.pdf" onClick={(event) => track(event.target.href)}>Русский</a>
                    {', '}
                    <a href="https://unctad.org/system/files/press-material/PR23004_TIR23_pt_Rev.1.pdf" onClick={(event) => track(event.target.href)}>Português</a>
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
