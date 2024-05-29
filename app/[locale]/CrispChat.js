import React, { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "5ff6084b-14d1-415b-831d-264a16a62475";
      (function() {
        d = document;
        s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    `;
    // Append the script to the head
    document.head.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything visible
};

export default CrispChat;
