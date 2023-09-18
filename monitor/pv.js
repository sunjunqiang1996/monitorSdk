import { getPathTo, report, lazyReport } from '../utils/utils.js'

export default class MonitorPv {
  constructor(options) {
    this.data = {
      appid: options.appid,
      userid: options.userid
    }
    initPushStateAndReplaceState()
    this.startTime = this.endTime = null
    if (performance?.timing) {
      this.startTime = performance?.timing.connectStart
    } else {
      this.startTime = Date.now()
    }
    window.addEventListener('load', () => {
      const data = {
        actionType: 'visit',
        href: location.href,
        startTime: this.startTime,
      }
      this.report(Object.assign(this.data, data))
    })
    window.addEventListener('unload', () => {
      const data = {
        actionType: 'visit',
        href: location.href,
        startTime: this.startTime,
        endTime: Date.now()
      }
      this.report(Object.assign(this.data, data))
    })
    window.addEventListener('pushState', () => {
      const data = {
        actionType: 'visit',
        href: location.href,
        startTime: this.startTime,
        endTime: Date.now()
      }
      this.startTime = Date.now()
      this.report(Object.assign(this.data, data))
    })

    window.addEventListener('replaceState', () => {
      const data = {
        actionType: 'visit',
        href: location.href,
        startTime: this.startTime,
        endTime: Date.now()
      }
      this.startTime = Date.now()
      this.report(Object.assign(this.data, data))
    })

    window.addEventListener('go', () => {
      const data = {
        actionType: 'visit',
        href: location.href,
        startTime: this.startTime,
        endTime: Date.now()
      }
      this.startTime = Date.now()
      this.report(Object.assign(this.data, data))
    })

    window.addEventListener('forward', () => {
      console.log(`forward 事件触发了`);
      // navigator.sendBeacon(`http://127.0.0.1:8889?params=123111`)
    })
  }

  lazyReport(data) {
    lazyReport(data)
  }

  report(data) {
    report(JSON.stringify(data))
  }
}

function initPushStateAndReplaceState() {
  function bindEventListener(type) {
    const historyEvent = history[type]
    return function() {
      const newEvent = historyEvent.apply(this, arguments)
      const e = new Event(type)
      e.arguments = arguments
      window.dispatchEvent(e)
      return newEvent
    }
  }
  history.pushState = bindEventListener('pushState')
  history.replaceState = bindEventListener('replaceState')
  history.go = bindEventListener('go')
  history.forward = bindEventListener('forward')
}
