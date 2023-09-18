
export function starandOptions(options) {
  return options
}

export function report(data) {
  if (!navigator.sendBeacon) { // 如果支持 sendBeacon
    navigator.sendBeacon(`http://127.0.0.1:8889?params=${encodeURIComponent(data)}`)
  } else { // 不支持的使用img上报
    const imgDom = new Image
    imgDom.src = `http://127.0.0.1:8889?params=${encodeURIComponent(data)}`
    document.body.appendChild(imgDom)
    setTimeout(() => {
      document.body.removeChild(imgDom)
    }, 100)
  }
}

const caches = []
export function lazyReport(data, flag) {
  const len = caches.length
  if (len > 10) {
    const params = caches.splice()
    report(JSON.stringify(params))
  } else {
    caches.push(data)
  }
}

export function getPathTo(element) {
  if (element.id !== '') {
    return `//*[@id="${element.id}"`
  }
  if (element === document.body) {
    return element.tagName
  }
  let ix = 0
  let siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    let sibling = siblings[i]
    if (siblings === element) {
      return `${gatPathTo(element.parentNode)}/${element.tagName}[${ix + 1}]`
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++
  }
}
