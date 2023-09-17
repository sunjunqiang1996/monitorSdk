import { starandOptions } from './utils/utils.js'
import MonitorError from './monitor/error.js'
import MonitorBehavior from './monitor/behavior.js'
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

  report(type, data) {
    if (type === 'error') {
      this.errorIns && this.errorIns.report(data)
    } else if (type === 'behavior') {
      this.behaviorIns && this.behaviorIns.report(data)
    }
  }

  lazyReport(type, data) {
    if (type === 'error') {
      this.errorIns && this.errorIns.lazyReport(data)
    } else if (type === 'behavior') {
      this.behaviorIns && this.behaviorIns.lazyReport(data)
    }
  }

}

