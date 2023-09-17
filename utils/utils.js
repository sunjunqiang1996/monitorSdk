
export function starandOptions(options) {
  return options
}

export function report(data) {
  console.log(data)
}

const caches = []
export function lazyReport(data, flag) {
  const len = caches.length
  if (len > 10) {
    report(JSON.stringify(caches))
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
