import request from '@/utils/request'

// 添加商品到购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'POST',
    data: {
      goodsId, // 商品ID
      goodsNum, // 商品数量
      goodsSkuId // 商品SKUID
    }
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/list'
  })
}
