import { allowedDomain, searchPageUri } from './libs/consts'
import { getActiveTab } from './libs/common'

function getStatus(tab) {
  if (tab.url.includes(searchPageUri)) {
    return {
      color: 'green',
      text: 'S'
    }
  }

  if (tab.url.includes(allowedDomain)) {
    return {
      color: 'green',
      text: 'P'
    }
  }

  return {
    color: 'red',
    text: ''
  }
}

async function polling() {
  const tabs = await getActiveTab()

  const { color, text } = getStatus(tabs[0]) 

  chrome.browserAction.setBadgeBackgroundColor({ color })
  chrome.browserAction.setBadgeText({ text })

  setTimeout(polling, 500)
}

polling()
