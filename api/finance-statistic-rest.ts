import request from "@/utils/request";

/**
 * 01、财务统计按照时间
 */
export async function queryFinanceByDate(params: {
  /*日期类型：1日、2月、3年*/
  dateType: string;
  /*按日筛选传入月份*/
  month?: string;
  /*报名点*/
  pointId?: string;
  /*按月份筛选传入年份*/
  year?: string;
}): Promise<RFinanceByDateRsp> {
  const result = await request<RFinanceByDateRsp>({
    url: "/statistic/finance/queryFinanceByDate.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照支付方式
 */
export async function queryFinanceByPayWay(params: {
  /*结束时间*/
  endTime?: string;
  /*报名点*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<RFinanceByPayWayRsp> {
  const result = await request<RFinanceByPayWayRsp>({
    url: "/statistic/finance/queryFinanceByPayWay.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照款项
 */
export async function queryFinanceByPayment(params: {
  /*结束时间*/
  endTime?: string;
  /*报名点*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<RFinanceByPaymentRsp> {
  const result = await request<RFinanceByPaymentRsp>({
    url: "/statistic/finance/queryFinanceByPayment.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照报名点
 */
export async function queryFinanceByPoint(params: {
  /*结束时间*/
  endTime?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<RFinanceByPointRsp> {
  const result = await request<RFinanceByPointRsp>({
    url: "/statistic/finance/queryFinanceByPoint.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、按日期查资金流水
 */
export async function queryFinanceItemList(params: {
  /*日期*/
  date?: string;
}): Promise<RListFinanceItemVO> {
  const result = await request<RListFinanceItemVO>({
    url: "/statistic/finance/queryFinanceItemList.do",
    method: "get",
    params,
  });
  return result.result;
}

type RFinanceByDateRsp = FinanceByDateRsp;

type RFinanceByPayWayRsp = FinanceByPayWayRsp;

type RFinanceByPaymentRsp = FinanceByPaymentRsp;

type RFinanceByPointRsp = FinanceByPointRsp;

type RListFinanceItemVO = FinanceItemVO;

export interface FinanceByDateVO {
  /*支出*/
  expend?: string;
  /*收入*/
  income?: string;
  /*日期*/
  payDate?: string;
  /*退费*/
  refund?: string;
}
export interface FinanceByDateRsp {
  /*欠费*/
  arrears?: string;
  /*按照时间统计的数据*/
  financeByDateList?: FinanceByDateVO;
  /*今日支出*/
  todayExpend?: string;
  /*今日收入*/
  todayIncome?: string;
  /*今日收入*/
  todayRefund?: string;
  /*昨日支出*/
  yesterdayExpend?: string;
  /*昨日收入*/
  yesterdayIncome?: string;
}
export interface FinanceByPayWayVO {
  /*支出*/
  expend?: string;
  /*收入*/
  income?: string;
  /*支付方式*/
  payWay?: string;
  /*退费*/
  refund?: string;
}
export interface FinanceByPayWayRsp {
  /*按照支付方式统计的数据*/
  financeByPayWayList?: FinanceByPayWayVO;
  /*合计支出*/
  totalExpend?: string;
  /*合计收入*/
  totalInCome?: string;
  /*合计退款*/
  totalRefund?: string;
}
export interface FinanceByPaymentVO {
  /*支出*/
  expend?: string;
  /*收入*/
  income?: string;
  /*款项*/
  payment?: string;
  /*退费*/
  refund?: string;
}
export interface FinanceByPaymentRsp {
  /*按照款项统计的数据*/
  financeByPaymentList?: FinanceByPaymentVO;
  /*合计支出*/
  totalExpend?: string;
  /*合计收入*/
  totalInCome?: string;
  /*合计退款*/
  totalRefund?: string;
}
export interface FinanceByPointVO {
  /*支出*/
  expend?: string;
  /*收入*/
  income?: string;
  /*报名点id*/
  pointId?: number;
  /*报名点名称*/
  pointName?: string;
  /*退费*/
  refund?: string;
}
export interface FinanceByPointRsp {
  /**/
  financeByPointList?: FinanceByPointVO;
  /*合计支出*/
  totalExpend?: string;
  /*合计收入*/
  totalInCome?: string;
  /*合计退款*/
  totalRefund?: string;
}
export interface FinanceItemVO {
  /**/
  amount?: string;
  /**/
  financeType?: string;
  /**/
  payItemName?: string;
  /**/
  studentId?: string;
  /**/
  studentName?: string;
}
