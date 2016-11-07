(function(d,t) {
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.id='perf_mon_js';
    g.src='https://rails-rn-prod.sandia.gov/sos/noauth/page_load.js?username=' + user + '&track_external_links&send_data_manually=true';
    s.parentNode.insertBefore(g,s);
} (document, 'script'));