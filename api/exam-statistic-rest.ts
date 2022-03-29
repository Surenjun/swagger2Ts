import request from "@/utils/request";

/**
 * 01、考试按教练统计
 * 
 */
export async function examStatisticByCoach(params: {
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
}): Promise<RListExamByCoachData> {
  const result = await request<RListExamByCoachData>({
    url: "/statistic/exam/examStatisticByCoach.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 01、考试按时间统计
 */
export async function examStatisticByDate(params: {
  /*月份yyyyMM*/
  month?: string;
  /*报名点*/
  pointId?: string;
  /*科目*/
  subject?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<RExamByDateRsp> {
  const result = await request<RExamByDateRsp>({
    url: "/statistic/exam/examStatisticByDate.do",
    method: "get",
    params,
  });
  return result.result;
}

type RListExamByCoachData = ExamByCoachData;

type RExamByDateRsp = ExamByDateRsp;

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
export interface ExamByDateEntity {
  /**/
  examDate?: string;
  /**/
  examRecordId?: number;
  /*1、已预约 2、通过 3、不通过 4、旷考 5、已确认 */
  examResult?: string;
  /**/
  schoolId?: number;
  /**/
  studentId?: number;
  /**/
  studentName?: string;
  /**/
  subject?: string;
}
export interface ExamByDateVO {
  /**/
  count?: number;
  /**/
  studentExamInfo?: ExamByDateEntity;
}
export interface ExamByDateData {
  /**/
  date?: string;
  /**/
  orderExamRecord?: ExamByDateVO;
  /**/
  passedExamRecord?: ExamByDateVO;
  /**/
  realExamRecord?: ExamByDateVO;
  /**/
  unPassedExamRecord?: ExamByDateVO;
}
export interface ExamByDateRsp {
  /**/
  examByDateList?: ExamByDateData;
}
