import { getPathTo, report, lazyReport } from '../utils/utils.js'
/**
 * 1. 手动埋点监控
 * 2. 无痕埋点监控
 */
export default class MonitorBehavior {
  constructor(options) {
    this.data = {
      appid: options.appid,
      userid: options.userid,
      type: 'behavior'
    }
    document.body.addEventListener('click', (e) => {
      const clickDom = e.target
      const target = clickDom?.getAttribute('data-target')
      const no = clickDom?.getAttribute('data-no')
      if (no) return
      const data = {
        actionType: 'click',
        href: location.href
      }
      if (target) {
        data.data = target
      } else {
        const path = getPathTo(clickDom)
        data.data = path
      }
      if (options.delay) {
        this.lazyReport(data)
      } else {
        this.report(data)
      }
    })
  }

  lazyReport(data) {
    const params = Object.assign(this.data, data)
    lazyReport(params)
  }

  report(data) {
    console.log('wwwwwwwww2');
    const params = Object.assign(this.data, data)
    report(JSON.stringify(params))
  }
}
