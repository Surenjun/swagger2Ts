import request from "@/utils/request";

/**
 * 03、查询招生计划员工详情列表
 */
export async function queryEmployeePlanDetail(params: {}): Promise<REmployeePlanDetail> {
  const result = await request<REmployeePlanDetail>({
    url: "/recruitStudent/queryEmployeePlanDetail.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 02、查询招生计划按员工统计列表
 */
export async function queryEmployeePlanStatistic(params: {
  /*员工名称*/
  employeeName?: string;
  /*年份不能为空。默认当年*/
  year: string;
}): Promise<RListEmployeePlanStatistic> {
  const result = await request<RListEmployeePlanStatistic>({
    url: "/recruitStudent/queryEmployeePlanStatistic.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 04、查询我的招生列表
 */
export async function queryMyRecruitStudentInfo(params: {
  /*结束时间 格式为yyyy-MM-dd*/
  endTime?: string;
  /*开始时间 格式为yyyy-MM-dd*/
  startTime?: string;
}): Promise<RMyRecruitStudent> {
  const result = await request<RMyRecruitStudent>({
    url: "/recruitStudent/queryMyRecruitStudentInfo.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、招生计划统计列表
 */
export async function queryRecruitPlanList(params: {
  /*计划名称*/
  planName?: string;
  /*年份不能为空。默认当年*/
  year: string;
}): Promise<RListRecruitPlanStatistic> {
  const result = await request<RListRecruitPlanStatistic>({
    url: "/recruitStudent/queryRecruitPlanList.do",
    method: "get",
    params,
  });
  return result.result;
}

type REmployeePlanDetail = EmployeePlanDetail;

type RListEmployeePlanStatistic = EmployeePlanStatistic;

type RMyRecruitStudent = MyRecruitStudent;

type RListRecruitPlanStatistic = RecruitPlanStatistic;

export interface RecruitPlanStatistic {
  /*开始时间*/
  beginTime?: string;
  /*考核员工数量*/
  checkCount?: number;
  /*完成率*/
  completionRate?: number;
  /*结束时间*/
  endTime?: string;
  /*完成数量*/
  finishNum?: number;
  /*计划名称*/
  name?: string;
  /*计划id*/
  planId?: number;
  /*计划数量*/
  planNum?: number;
  /*达标数量*/
  reachCount?: number;
  /*计划状态*/
  status?: string;
}
export interface EmployeePlanDetail {
  /*员工id*/
  employeeId?: number;
  /*员工姓名*/
  employeeName?: string;
  /*达标计划数*/
  finishCount?: number;
  /*所在计划数*/
  planCount?: number;
  /*所在计划列表*/
  planList?: RecruitPlanStatistic;
  /*所在招生数*/
  planRecruitCount?: number;
  /*实际招生数*/
  realRecruitCount?: number;
}
export interface EmployeePlanStatistic {
  /*员工id*/
  employeeId?: number;
  /*员工姓名*/
  employeeName?: string;
  /*达标计划数*/
  finishCount?: number;
  /*所在计划数*/
  planCount?: number;
  /*计划id*/
  planIds?: string;
  /*所在招生数*/
  planRecruitCount?: number;
  /*实际招生数*/
  realRecruitCount?: number;
}
export interface RecruitPlanByDateVo {
  /*日期*/
  date?: string;
  /*招生数量*/
  total?: string;
}
export interface MyRecruitStudent {
  /*上月招生*/
  lastMonthRecruitStudent?: number;
  /*去年招生数*/
  lastYearRecruitStudent?: number;
  /*本月招生*/
  monthRecruitStudent?: number;
  /*月度招生列表*/
  recruitStudentListByMonth?: RecruitPlanByDateVo;
  /*今日招生*/
  todayRecruitStudent?: number;
  /*本年招生数*/
  yearRecruitStudent?: number;
  /*昨日招生*/
  yesterdayRecruitStudent?: number;
}
