import Mock from 'mockjs';

type MsgType = string | number;

const success = (msg: MsgType = '', data?: any) => {
  // 定义一个成功返回的统一方法，返回在 axios 封装时指定的三个字段
  return {
    code: 0,
    msg,
    data,
  };
};

const error = (code: number, msg: MsgType = '', data?: any) => {
  // 定义一个返回错误状态的方法，一个必传参数是 code，即错误码
  return {
    code,
    msg,
    data,
  };
};

interface PostResInterface {
  body: string;
  type: 'POST';
  url: string;
}

Mock.mock(/\/api\/user\/login/, loginRes);

function loginRes(req: PostResInterface) {
  const { user_name, password } = JSON.parse(req.body);
  if (user_name === 'Lison' && String(password) === '123456') {
    return success();
  } else {
    return error(1001, '用户名或密码错误');
  }
}
