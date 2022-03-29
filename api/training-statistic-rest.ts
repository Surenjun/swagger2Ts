import request from "@/utils/request";

/**
 * 01、在培人数统计
 */
export async function queryTrainingStatistic(params: {
  /*结束时间*/
  endTime?: string;
  /*套餐id*/
  packageId?: string;
  /*报名点id*/
  pointId?: string;
  /*开始时间*/
  startTime?: string;
  /*车型id*/
  vehicleKindId?: string;
}): Promise<RTrainingStatisticRsp> {
  const result = await request<RTrainingStatisticRsp>({
    url: "/statistic/training/queryTrainingStatistic.do",
    method: "get",
    params,
  });
  return result.result;
}

type RTrainingStatisticRsp = TrainingStatisticRsp;

export interface TrainingStatisticVO {
  /*数量*/
  num?: number;
  /*百分比*/
  percent?: number;
  /*科目*/
  subject?: string;
}
export interface TrainingStatisticRsp {
  /**/
  totalCount?: number;
  /**/
  trainingStatisticList?: TrainingStatisticVO;
}
