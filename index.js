import { starandOptions } from './utils/utils.js'
import MonitorError from './monitor/error.js'
import MonitorBehavior from './monitor/behavior.js'
import MonitorPv from './monitor/pv.js'
import { report, lazyReport } from './utils/utils.js'
export default class Monitor {
  /***
   * options
   *  {
   *    appid: 表示此应用程序的id号
   *    openError: 是否开启错误监控,
   *    openBehavior: 是否开启行为监控,
   *    openPv: 是否开启Pv监控
   *    openUv: 是否开启Uv
   * }
   */
  constructor(options) {
    this.data = {
      appid: options.appid,
      userid: options.userid
    }
    // 1. 获取初始化参数
    const opts =this.options = starandOptions(options)
    // 2. 根据参数， 初始化监控类型： 错误监控、行为监控、PV、UV
    if (opts.openError) {
      this.errorIns = new MonitorError(opts)
    }

    if (opts.openBehavior) {
      this.behaviorIns = new MonitorBehavior(opts)
    }

    if (opts.openPv) {
      this.errorIns = new MonitorPv(opts)
    }

    if (opts.openUv) {
      this.errorIns = new MonitorUv(opts)
    }
  }

  report(data) {
    // 缺少处理数据的功能
    report(JSON.stringify(Object.assign(this.data, data)))
  }

  lazyReport(data) {
    // 缺少处理数据的功能
    lazyReport(Object.assign(this.data, data))
  }

}

