'use strict';

const moment = require('moment');

const Controller = require('egg').Controller;

class BillController extends Controller {
  async add(){
    const { ctx, app } = this;
    const {
      amount, type_id, type_name,
      date, pay_type, remark = ''
    } = ctx.request.body;

    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数有误',
        data: null
      }
    }

    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;

      user_id = decode.id;
      
      console.log('=====',amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id,'===')

      const result = await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id
      });

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async list(){
    const { ctx, app } = this;
    const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;
    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;

      user_id = decode.id;
      const list = await ctx.service.bill.list(user_id);
      const _list = list.filter(item => {
        if (type_id !== 'all') {
          return moment(Number(item.date)).format('YYYY-MM') == date && type_id == item.type_id
        }

        return moment(Number(item.date)).format('YYYY-MM') == date
      })

      let listMap = _list.reduce((curr, item) => {
        const date = moment(Number(item.date)).format('YYYY-MM-DD')

        if (curr && curr.length && curr.findIndex(item => item.date == date) > -1) {
          const index = curr.findIndex(item => item.date == date)
          curr[index].bills.push(item)
        }

        if (curr && curr.length && curr.findIndex(item => item.date === date) == -1) {
          curr.push({
            date,
            bills: [item]
          })
        }

        if (!curr.length) {
          curr.push({
            date,
            bills: [item]
          })
        }

        return curr
      }, []).sort((a,b) => moment(b.date) = moment(a.date))

      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size)

      let __list = list.filter(item => moment(Number(item.date)).format('YYYY-MM') == date)

      let totalExpense = __list.reduce((curr, item) => {
        if (item.pay_type == 1) {
          curr += Number(item.amount)
          return curr;
        }
        return curr
      }, 0)

      let totalIncome = __list.reduce((curr, item) => {
        if (item.pay_type == 2) {
          curr += Number(item.amount)
          return curr;
        }
        return curr;
      }, 0)

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalExpense,
          totalIncome,
          totalPage: Math.ceil(listMap.length / page_size),
          list: filterListMap || []
        }
      }
    } catch(err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async detail(){
    const { ctx, app } = this;
    const { id = '' } = ctx.query;
    let user_id;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;

    user_id = decode.id;

    if (!id) {
      ctx.body = {
        code: 500,
        msg: '订单id不能为空',
        data: null
      }
      return
    }

    try {
      const detail = await ctx.service.bill.detail(id, user_id);
      if (detail && detail.id) {
        ctx.body = {
          code: 200,
          msg: '请求成功',
          data: detail
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '请求数据不存在',
          data: null
        }
      }
      
    } catch(err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async update(){
    const { ctx, app } = this;
    const { id, amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;

    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }

    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;

      user_id = decode.id

      const result = await ctx.service.bill.update({
        id, amount, type_id,
        type_name, date,
        pay_type, remark, user_id
      })

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async delete(){
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }

    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id;
      const result = await ctx.service.bill.delete(id, user_id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async data(){
    const { ctx, app } = this;
    const { date = '' } = ctx.query

    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      let user_id = decode.id;
      const result = await ctx.service.bill.list(user_id);
      const start = moment(date).startOf('month').unix() * 1000;
      const end = moment(date).endOf('month').unix() * 1000;
      const _data = result.filter(item => (Number(item.date) > start && Number(item.date) < end))

      // 总支出
      let total_expense = _data.reduce((arr, cur) => {
        if (cur.pay_type == 1) {
          arr += Number(cur.amount)
        }
        return arr
      }, 0)

      _data.forEach(item => {
        if (item.pay_type == 1) {
          total_expense += Number(item.amount)
        }
      })

      // 总收入
      const total_income = _data.reduce((arr, cur) => {
        if (cur.pay_type == 2) {
          arr += Number(cur.amount)
        }
        return arr;
      }, 0)

      // 获取收支构成
      let total_data = _data.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.type_id == cur.type_id)
        if (index == -1) {
          arr.push({
            type_id: cur.type_id,
            type_name: cur.type_name,
            pay_type: cur.pay_type,
            number: Number(cur.amount)
          })
        }

        if (index > -1) {
          arr[index].numner += Number(cur.amount)
        }
        return arr
      }, [])

      total_data = total_data.map(item => {
        item.number = Number(Number(item.number).toFixed(2))
        return item
      })

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          total_expense: Number(total_expense).toFixed(2),
          total_income: Number(total_income).toFixed(2),
          total_data: total_data || []
        }
      }
    } catch(err) {
      console.log(err)
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: err
      }
    }
  }
}

module.exports = BillController;