import request from "@/utils/request";

/**
 * 01、查询学员档案列表
 */
export async function Querystudentarchivelist(params: {
  /*开始时间 格式为yyyy-MM-dd*/
  beginTime?: string;
  /*结束时间 格式为yyyy-MM-dd*/
  endTime?: string;
  /*套餐包id*/
  learnPacketId?: string;
  /*学习科目id 1、报名 2、第一部分 3、第二部分 4、第三部分 5、第4部分*/
  learnSubjectId?: string;
  /*欠费状态 1：欠费 0：不欠费*/
  needPay?: string;
  /*当前页码*/
  pageIndex?: number;
  /*页面数量*/
  pageSize?: number;
  /*报名点id*/
  recruitPointId?: string;
  /*性别 1：男 2：女*/
  sex?: string;
  /*学员姓名*/
  studentName?: string;
}): Promise<StudentArchiveVo> {
  const result = await request<StudentArchiveVo>({
    url: "/studentArchive/queryStudentArchiveList.do",
    method: "get",
    params,
  });
  return result.result;
}

export interface StudentArchiveVo {
  /**/
  endRow?: number;
  /**/
  hasNextPage?: boolean;
  /**/
  hasPreviousPage?: boolean;
  /**/
  isFirstPage?: boolean;
  /**/
  isLastPage?: boolean;
  /**/
  list?: array;
  /**/
  navigateFirstPage?: number;
  /**/
  navigateLastPage?: number;
  /**/
  navigatePages?: number;
  /**/
  navigatepageNums?: array;
  /**/
  nextPage?: number;
  /**/
  pageNum?: number;
  /**/
  pageSize?: number;
  /**/
  pages?: number;
  /**/
  prePage?: number;
  /**/
  size?: number;
  /**/
  startRow?: number;
  /**/
  total?: number;
}
