
import { report, lazyReport } from "../utils/utils.js";

export default class MonitorError {
  constructor(options) {
    this.data = {
      appid: options.appid,
      userid: options.userid
    }
    const originOnerror = window.onerror
    window.onerror = (msg, url, row, col, error) => {
      // 处理原有的onerror
      if (originOnerror) {
        originOnerror.call(window, msg, url, row, col, error)
      }
      const data = {
        type: 'jsError',
        message: msg,
        url,
        row,
        col,
        error
      }

      if (options.delay) {
        this.lazyReport(Object.assign(this.data, data))
      } else {
        this.report(Object.assign(this.data, data))
      }
      this.data = null
    }
    window.addEventListener('error', (e) => {
      const data = {
        type: 'resourceError',
        href: location.href,
        url: e.target.src
      }
      if (options.delay) {
        this.lazyReport(Object.assign(this.data, data))
      } else {
        this.report(Object.assign(this.data, data))
      }
      this.data = null
    }, true)
    window.addEventListener('unhandledrejection', (e) => {
      const data = {
        type: 'promiseError',
        href: location.href,
        reason: e.reason
      }
      if (options.delay) {
        this.lazyReport(Object.assign(this.data, data))
      } else {
        this.report(Object.assign(this.data, data))
      }
      this.data = null
    }, true)
  }

  lazyReport(data) {
    lazyReport(data)
  }

  report(data) {
    report(JSON.stringify(data))
  }
}
