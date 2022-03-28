import request from "@/utils/request";

/**
 * 01、财务统计按照时间
 */
export async function Queryfinancebydate(params: {
  /*日期类型：1日、2月、3年*/
  dateType: string;
  /*按日筛选传入月份*/
  month?: string;
  /*报名点*/
  pointId?: string;
  /*按月份筛选传入年份*/
  year?: string;
}): Promise<FinanceByDateRsp> {
  const result = await request<FinanceByDateRsp>({
    url: "/statistic/finance/queryFinanceByDate.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照支付方式
 */
export async function Queryfinancebypayway(params: {
  /*结束时间*/
  endTime?: string;
  /*报名点*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<FinanceByPayWayRsp> {
  const result = await request<FinanceByPayWayRsp>({
    url: "/statistic/finance/queryFinanceByPayWay.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照款项
 */
export async function Queryfinancebypayment(params: {
  /*结束时间*/
  endTime?: string;
  /*报名点*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<FinanceByPaymentRsp> {
  const result = await request<FinanceByPaymentRsp>({
    url: "/statistic/finance/queryFinanceByPayment.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、财务统计按照报名点
 */
export async function Queryfinancebypoint(params: {
  /*结束时间*/
  endTime?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<FinanceByPointRsp> {
  const result = await request<FinanceByPointRsp>({
    url: "/statistic/finance/queryFinanceByPoint.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、按日期查资金流水
 */
export async function Queryfinanceitemlist(params: {
  /*日期*/
  date?: string;
}): Promise<FinanceItemVO> {
  const result = await request<FinanceItemVO>({
    url: "/statistic/finance/queryFinanceItemList.do",
    method: "get",
    params,
  });
  return result.result;
}

export interface FinanceByDateRsp {
  /*欠费*/
  arrears?: string;
  /*按照时间统计的数据*/
  financeByDateList?: array;
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
export interface FinanceByPayWayRsp {
  /*按照支付方式统计的数据*/
  financeByPayWayList?: array;
  /*合计支出*/
  totalExpend?: string;
  /*合计收入*/
  totalInCome?: string;
  /*合计退款*/
  totalRefund?: string;
}
export interface FinanceByPaymentRsp {
  /*按照款项统计的数据*/
  financeByPaymentList?: array;
  /*合计支出*/
  totalExpend?: string;
  /*合计收入*/
  totalInCome?: string;
  /*合计退款*/
  totalRefund?: string;
}
export interface FinanceByPointRsp {
  /**/
  financeByPointList?: array;
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
