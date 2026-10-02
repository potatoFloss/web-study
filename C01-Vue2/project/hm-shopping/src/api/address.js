import request from '@/utils/request'

// 获取收货地址列表
export const getAddressList = () => {
  return request({
    url: '/address/list'
  })
}

// 因为提交订单需要收货地址，所以这里临时添加一个收货地址
// 添加收货地址
export const addAddress = (obj) => {
  return request.post('/address/add', {
    form: {
      name: '张小二',
      phone: '18999292929',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}
