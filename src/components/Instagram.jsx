import React, { useEffect } from "react";

export default function InstagramEmbed() {
  useEffect(() => {
    // Cargar el script de Instagram para renderizar embeds
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-start gap-4 flex-wrap mt-12">
      <iframe
        title="Instagram Embed 1"
        src="https://www.instagram.com/p/CPBUz9Dt3HR/embed"
        width="400"
        height="710"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        className="max-w-full"
      ></iframe>

      <iframe
        title="Instagram Embed 2"
        src="https://www.instagram.com/p/COtigI_j9rf/embed"
        width="400"
        height="710"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        className="max-w-full"
      ></iframe>

      <iframe
        title="Instagram Embed 3"
        src="https://www.instagram.com/p/CNYfggThPw0/embed"
        width="400"
        height="710"
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        className="max-w-full"
      ></iframe>
    </div>
  );
}
