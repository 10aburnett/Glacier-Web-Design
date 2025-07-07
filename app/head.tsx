export default function Head() {
  return (
    <>
      <title>Glacier Web Design - Premium Web Design Agency</title>
      <meta name="description" content="Transform your outdated website into a modern, high-performance digital experience. Specializing in web redesign, mobile optimization, and brand refresh." />
      {/* Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E7BSZ0EXBV"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E7BSZ0EXBV');
          `,
        }}
      />
    </>
  );
} 