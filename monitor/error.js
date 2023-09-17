
import { report, lazyReport } from "../utils/utils.js";

export default class MonitorError {
  constructor(options) {
    this.data = null
    const originOnerror = window.onerror
    window.onerror = (msg, url, row, col, error) => {
      // 处理原有的onerror
      if (originOnerror) {
        originOnerror.call(window, msg, url, row, col, error)
      }
      this.data = {
        appid: options.addid,
        userid: options.userid,
        type: 'jsError',
        message: msg,
        url,
        row,
        col,
        error
      }
      if (options.delay) {
        this.lazyReport()
      } else {
        this.report()
      }
      this.data = null
    }
    window.addEventListener('error', (e) => {
      console.log(e);
      this.data = {
        appid: options.appid,
        userid: options.userid,
        type: 'resourceError',
        href: location.href,
        url: e.target.src
      }
      if (options.delay) {
        this.lazyReport()
      } else {
        this.report()
      }
      this.data = null
    }, true)
    window.addEventListener('unhandledrejection', (e) => {
      this.data = {
        appid: options.addid,
        userid: options.userid,
        type: 'promiseError',
        href: location.href,
        reason: e.reason
      }
      if (options.delay) {
        this.lazyReport()
      } else {
        this.report()
      }
      this.data = null
    }, true)
  }

  lazyReport() {
    lazyReport(this.data)
  }

  report() {
    report(JSON.stringify(this.data))
  }
}
