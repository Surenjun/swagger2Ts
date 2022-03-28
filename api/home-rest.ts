import request from "@/utils/request";

/**
 * 03、获取验证码
 */
export async function getVerificationCode(data: {
  /*param*/

  param: VerificationCodeReq;
}): Promise<VerificationCodeRsp> {
  const result = await request<VerificationCodeRsp>({
    url: "/home/getVerificationCode.do",
    method: "post",

    data,
  });
  return result.result;
}

/**
 * 03、首页统计数据
 */
export async function Homestatistic(params: {}): Promise<HomeStatisticRsp> {
  const result = await request<HomeStatisticRsp>({
    url: "/home/homeStatistic.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 04、招生段子列表
 */
export async function Queryemployeeforumlist(params: {}): Promise<EmployeeForumVO> {
  const result = await request<EmployeeForumVO>({
    url: "/home/queryEmployeeForumList.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 05、获取学员套餐包信息列表
 */
export async function Querylearnpackagelist(params: {}): Promise<LearnPackageVO> {
  const result = await request<LearnPackageVO>({
    url: "/home/queryLearnPackageList.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 06、获取学员报名点信息列表
 */
export async function Queryrecruitpointlist(params: {}): Promise<RecruitPointVO> {
  const result = await request<RecruitPointVO>({
    url: "/home/queryRecruitPointList.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 06、获取车型列表
 */
export async function Queryvehiclekindlist(params: {}): Promise<VehicleKindVO> {
  const result = await request<VehicleKindVO>({
    url: "/home/queryVehicleKindList.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 06、获取车型套餐关联列表
 */
export async function Queryvehiclekindpackagelist(params: {}): Promise<VehicleKindPackageVO> {
  const result = await request<VehicleKindPackageVO>({
    url: "/home/queryVehicleKindPackageList.do",
    method: "get",
    params,
  });
  return result.result;
}

/**
 * 02、修改密码
 */
export async function updateUserPsd(data: {
  /*param*/

  param: UpdateUserPsdReq;
}): Promise<R> {
  const result = await request<R>({
    url: "/home/updateUserPsd.do",
    method: "post",

    data,
  });
  return result.result;
}

/**
 * 01、用户登录
 */
export async function userLogin(data: {
  /*req*/

  req: UserLoginReq;
}): Promise<用户基本信息> {
  const result = await request<用户基本信息>({
    url: "/home/userLogin.do",
    method: "post",

    data,
  });
  return result.result;
}

/**
 * 02、用户登出
 */
export async function userLogout(data: {}): Promise<R> {
  const result = await request<R>({
    url: "/home/userLogout.do",
    method: "post",

    data,
  });
  return result.result;
}

export interface VerificationCodeReq {
  /*用户账号*/
  account?: string;
  /*业务类型: G、用户登录 H、密码修改*/
  type?: string;
}
export interface VerificationCodeRsp {
  /*图片验证码base64*/
  imageBase64?: string;
  /*验证码*/
  verificationCode?: string;
}
export interface HomeStatisticRsp {
  /*今日支出*/
  dailyExpenditure?: string;
  /*今日收入*/
  dailyInCome?: string;
  /*今日退费*/
  dailyRefund?: string;
  /*今日招生*/
  dailyStuAddCount?: number;
  /*对应的菜单*/
  menuList?: array;
}
export interface EmployeeForumVO {
  /*内容*/
  content?: string;
  /*图片*/
  forumPhotos?: array;
  /*发布人头像*/
  headUrl?: string;
  /**/
  id?: number;
  /*是否发布*/
  isPublish?: string;
  /*发布时间*/
  publishTime?: string;
  /*发布人*/
  publisher?: string;
}
export interface LearnPackageVO {
  /*Id*/
  packageId?: number;
  /*套餐包名*/
  packageName?: string;
}
export interface RecruitPointVO {
  /*Id*/
  recruitPointId?: number;
  /*报名点名称*/
  recruitPointName?: string;
}
export interface VehicleKindVO {
  /**/
  vehicleKindId?: string;
  /**/
  vehicleKindName?: string;
}
export interface VehicleKindPackageVO {
  /**/
  learnPackages?: array;
  /**/
  vehicleKindId?: string;
  /**/
  vehicleKindName?: string;
}
export interface UpdateUserPsdReq {
  /*用户账号*/
  account?: string;
  /*图片验证码*/
  checkCode?: string;
  /*用户密码*/
  psd?: string;
}
export interface R {
  /*状态码 1成功 0通用失败*/
  code?: number;
  /*承载数据*/
  data?: object;
  /*返回消息*/
  msg?: string;
}
export interface UserLoginReq {
  /*用户账号*/
  account?: string;
  /*用户密码*/
  password?: string;
}
export interface 用户基本信息 {
  /*用户账号*/
  account?: string;
  /*所属城市id*/
  cityId?: string;
  /*所属城市 -正式用户返回当前驾校所属的城市*/
  cityName?: string;
  /*教练好评率*/
  coachGoodEvaluateRate?: string;
  /*教练id*/
  coachId?: string;
  /*所属区县id*/
  distructId?: string;
  /*员工id*/
  employeeId?: string;
  /*环信密码*/
  imPassword?: string;
  /*环信账号*/
  imUsername?: string;
  /*菜单分类列表*/
  menuClassifies?: array;
  /*用户头像*/
  photoPath?: string;
  /*所属省份id*/
  provinceId?: string;
  /*所属省份 -正式用户返回当前驾校所属的省份*/
  provinceName?: string;
  /*角色列表*/
  roleList?: array;
  /*驾校id*/
  schoolId?: string;
  /*驾校名称*/
  schoolName?: string;
  /*鉴权token*/
  token?: string;
  /*用户id*/
  userId?: string;
  /*用户姓名*/
  userName?: string;
}
