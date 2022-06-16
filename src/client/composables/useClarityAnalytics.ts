declare const dataLayer: any[]
declare const clarityTag: (...args: any[]) => void

declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    clarityTag?: typeof clarityTag
  }
}

/**
 * Add bdtag.js to your site
 */
export const useClarityAnalytics = (id: string): void => {
  // 避免重复添加
  if (window.dataLayer && window.clarityTag) {
    return
  }
  // 插入Bing分析
  const clarityScript = document.createElement('script')
  clarityScript.text= `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${id}");`
  document.head.appendChild(clarityScript)

  // insert gtag snippet
  window.dataLayer = window.dataLayer || []
  // the gtag function must use `arguments` object to forward parameters
  window.clarityTag = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }

  clarityTag('js', new Date())
  clarityTag('config', id)
}
