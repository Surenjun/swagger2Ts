import request from "@/utils/request";

/**
 * 01、招生统计按照时间
 */
export async function queryRecruitByDate(params: {
  /*是否包含退学：0不包含1包含*/
  containDropOut: string;
  /*日期类型：1日、2月、3年*/
  dateType: string;
  /*按日筛选传入月份*/
  month?: string;
  /*套餐id*/
  packageId?: string;
  /*报名点*/
  pointId?: string;
  /*车型id*/
  vehicleKindId?: string;
  /*按月份筛选传入年份*/
  year?: string;
}): Promise<RRecruitStuByDateRsp> {
  const result = await request<RRecruitStuByDateRsp>({
    url: "/statistic/recruitStudent/queryRecruitByDate.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、招生统计按照套餐
 */
export async function queryRecruitByPackage(params: {
  /*是否包含退学：0不包含1包含*/
  containDropOut: string;
  /*结束时间*/
  endTime?: string;
  /*开始时间*/
  startTime?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<RRecruitStuByPackageRsp> {
  const result = await request<RRecruitStuByPackageRsp>({
    url: "/statistic/recruitStudent/queryRecruitByPackage.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、招生统计按照报名点
 */
export async function queryRecruitByPoint(params: {
  /*结束时间*/
  endTime?: string;
  /*套餐id*/
  packageId?: string;
  /*开始时间*/
  startTime?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<RRecruitStuByPointRsp> {
  const result = await request<RRecruitStuByPointRsp>({
    url: "/statistic/recruitStudent/queryRecruitByPoint.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、招生统计按照介绍人
 */
export async function queryRecruitBySponsor(params: {
  /*是否包含退学：0不包含1包含*/
  containDropOut: string;
  /*结束时间*/
  endTime?: string;
  /*套餐id*/
  packageId?: string;
  /*开始时间*/
  startTime?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<RRecruitStuBySponsorRsp> {
  const result = await request<RRecruitStuBySponsorRsp>({
    url: "/statistic/recruitStudent/queryRecruitBySponsor.do",
    method: "get",
    params,
  });
  return result.result;
}

type RRecruitStuByDateRsp = RecruitStuByDateRsp;

type RRecruitStuByPackageRsp = RecruitStuByPackageRsp;

type RRecruitStuByPointRsp = RecruitStuByPointRsp;

type RRecruitStuBySponsorRsp = RecruitStuBySponsorRsp;

export interface RecruitStuByDateVO {
  /*日期*/
  dateStr?: string;
  /*统计数量*/
  num?: number;
}
export interface RecruitStuByDateRsp {
  /*当月数据*/
  curMonthCount?: number;
  /*今年数据*/
  curYearCount?: number;
  /*上月数据*/
  lastMonthCount?: number;
  /*去年数据*/
  lastYearCount?: number;
  /*按日统计的数据*/
  recruitStuByDateList?: RecruitStuByDateVO;
  /*今日数据*/
  todayCount?: number;
  /*昨日数据*/
  yesterdayCount?: number;
}
export interface RecruitStuByPackageVO {
  /**/
  num?: string;
  /**/
  packageName?: string;
}
export interface RecruitStuByPackageRsp {
  /*按照套餐统计的数据*/
  recruitStuByPackageList?: RecruitStuByPackageVO;
}
export interface RecruitStuByPointVO {
  /*数量*/
  num?: number;
  /*报名点名称*/
  pointName?: string;
}
export interface RecruitStuByPointRsp {
  /*按照报名点统计的数据*/
  recruitStuByPointList?: RecruitStuByPointVO;
}
export interface RecruitStuBySponsorVO {
  /*数量*/
  num?: number;
  /*介绍人名称*/
  sponsorName?: string;
}
export interface RecruitStuBySponsorRsp {
  /*按照介绍人统计的数据*/
  recruitStuBySponsorList?: RecruitStuBySponsorVO;
}
