import request from "@/utils/request";

/**
 * 01、学员属性统计
 */
export async function studentPropertyStatistic(params: {
  /*结束时间*/
  endTime?: string;
  /*套餐id*/
  packageId?: string;
  /*报名点id*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
}): Promise<RStuPropertyStatisticByAgeRsp> {
  const result = await request<RStuPropertyStatisticByAgeRsp>({
    url: "/statistic/studentProperty/studentPropertyStatistic.do",
    method: "get",
    params,
  });
  return result.result;
}

type RStuPropertyStatisticByAgeRsp = StuPropertyStatisticByAgeRsp;

export interface StuPropertyStatisticByAge {
  /**/
  ageRange?: string;
  /**/
  num?: number;
}
export interface StuPropertyStatisticByAgeRsp {
  /*男性数量*/
  femaleCount?: number;
  /*女性数量*/
  maleCount?: number;
  /*按照学生年龄统计的数据*/
  statisticByAges?: StuPropertyStatisticByAge;
}
