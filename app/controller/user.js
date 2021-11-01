'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async register(){
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null
      }
      return;
    }

    const userInfo = await ctx.service.user.getUserByName(username);
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号已被注册，请重新输入',
        data: null
      }
      return;
    }

    const defaultAvatar = 'https://images-beta.yjyz.com/erp/user/7f5d9e9f571f4eb3b6f0496855f8be3a.jpeg?x-oss-process=image/auto-orient,1/resize,m_fill,w_105,h_85/quality,q_90';
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '',
      avatar: defaultAvatar,
      ctime: new Date().getTime()
    })
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }

  async login(){
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }

    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      msg: '登陆成功',
      data: {
        token
      }
    }
  }

  async getUserInfo(){
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username)

    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar
      }
    }
  }

  async editUserInfo(){
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;

    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar
      })

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          avatar
        }
      }
    } catch(err) {  
      console.log({err})
    }
  }
}

module.exports = UserController;