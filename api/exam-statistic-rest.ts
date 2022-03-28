import request from "@/utils/request";

/**
 * 01、考试按教练统计
 */
export async function Examstatisticbycoach(params: {
  /*结束时间*/
  endTime?: string;
  /*教练是否离职 1显示离职 0不显示*/
  ifQuit?: string;
  /*报名点*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
  /*科目*/
  subject?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<ExamByCoachData> {
  const result = await request<ExamByCoachData>({
    url: "/statistic/exam/examStatisticByCoach.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、考试按时间统计
 */
export async function Examstatisticbydate(params: {
  /*月份yyyyMM*/
  month?: string;
  /*报名点*/
  pointId?: string;
  /*科目*/
  subject?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<ExamByDateRsp> {
  const result = await request<ExamByDateRsp>({
    url: "/statistic/exam/examStatisticByDate.do",
    method: "get",
    params,
  });
  return result.result;
}

export interface ExamByCoachData {
  /**/
  coachId?: string;
  /**/
  coachName?: string;
  /**/
  examCount?: number;
  /**/
  oneTimeRate?: string;
  /**/
  passCount?: number;
  /**/
  passRate?: string;
}
export interface ExamByDateRsp {
  /**/
  examByDateList?: array;
}
