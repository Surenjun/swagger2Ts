import request from "@/utils/request";

/**
 * 01、查询我的学员列表
 */



export async function Querymystudentlist(params: {
  /*学习科目id 1、报名 2、第一部分 3、第二部分 4、第三部分 5、第4部分*/
  learnSubjectId?: string;
  /*欠费状态 1：欠费 0：不欠费*/
  needPay?: string;
  /*学员姓名*/
  studentName?: string;
}): Promise<MyStudentRsp> {
  const result = await request<MyStudentRsp>({
    url: "/myStudent/queryMyStudentList.do",
    method: "get",
    params,
  });
  return result.result;
}

export interface MyStudentRsp {
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
  /*性别 1：男 0：女*/
  sex?: string;
  /*报名时间*/
  signUpDate?: string;
  /*学员id*/
  studentId?: number;
  /*学员姓名*/
  studentName?: string;
  /*推荐人*/
  studentSource?: string;
  /*科一是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject1IsPass?: string;
  /*科二是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject2IsPass?: string;
  /*科三是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject3IsPass?: string;
  /*科四是否通过 1、已预约 2、通过 3、不通过 4、旷考 5、已确认*/
  subject4IsPass?: string;
  /*车型名*/
  vehicleKindName?: string;
}
