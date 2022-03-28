import request from "@/utils/request";

/**
 * 01、在培人数统计
 */
export async function Querytrainingstatistic(params: {
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
}): Promise<TrainingStatisticRsp> {
  const result = await request<TrainingStatisticRsp>({
    url: "/statistic/training/queryTrainingStatistic.do",
    method: "get",
    params,
  });
  return result.result;
}

export interface TrainingStatisticRsp {
  /**/
  totalCount?: number;
  /**/
  trainingStatisticList?: array;
}
