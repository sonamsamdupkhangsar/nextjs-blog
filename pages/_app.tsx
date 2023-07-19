import '../styles/global.css'
import { AppProps } from 'next/app'
import Script from 'next/script'
export default function App({ Component, pageProps }: AppProps) {  
  return (<>
<Script
        type="module"        
        dangerouslySetInnerHTML={{
          __html: `
         import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
         mermaid.initialize({startOnLoad: true});
         mermaid.contentLoaded();`,
        }}
      />
  {/* eslint-disable-next-line react/jsx-props-no-​spreading */}
  <Component {...pageProps} />
  </>)
}