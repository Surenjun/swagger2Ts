import request from "@/utils/request";

/**
 * 01、查询学员档案列表
 */
export async function queryStudentArchiveList(params: {
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
}): Promise<RPageInfoStudentArchiveVo> {
  const result = await request<RPageInfoStudentArchiveVo>({
    url: "/studentArchive/queryStudentArchiveList.do",
    method: "get",
    params,
  });
  return result.result;
}

type RPageInfoStudentArchiveVo = PageInfoStudentArchiveVo;

export interface StudentArchiveVo {
  /*员工姓名*/
  employeeName?: string;
  /*科目Id 1、报名 2、第一部分 3、第二部分 4、第三部分 5、第4部分*/
  learnSubjectId?: string;
  /*欠费状态 1：欠费 0：不欠费*/
  needPay?: string;
  /*套餐名*/
  packageName?: string;
  /*学员照片*/
  photoUrl?: string;
  /*报名点名称*/
  recruitPointName?: string;
  /*性别 1：男 2：女*/
  sex?: string;
  /*报名时间*/
  signUpDate?: string;
  /*学员id*/
  studentId?: number;
  /*学员姓名*/
  studentName?: string;
  /*科一是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject1IsPass?: string;
  /*科二是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject2IsPass?: string;
  /*科三是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject3IsPass?: string;
  /*科四是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject4IsPass?: string;
  /*车型名称*/
  vehicleKindName?: string;
}
export interface PageInfoStudentArchiveVo {
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
  list?: StudentArchiveVo;
  /**/
  navigateFirstPage?: number;
  /**/
  navigateLastPage?: number;
  /**/
  navigatePages?: number;
  /**/
  navigatepageNums?: number[];
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
