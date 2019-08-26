
export function selector(tabId) {
  return {
    $src: (selector) => (
      new Promise((resolve) => {
        chrome.tabs.executeScript(tabId, {
          code: `document.querySelector('${selector}').outerHTML`
        }, resolve);
      }) 
    )
  }
}

export function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({active: true}, resolve)
  })
}
