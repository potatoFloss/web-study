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

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/update',
    method: 'POST',
    data: {
      goodsId, // 商品ID
      goodsNum, // 商品数量
      goodsSkuId // 商品SKUID
    }
  })
}

// 删除购物车商品
export const delSelect = (cartIds) => {
  return request({
    url: '/cart/clear',
    method: 'POST',
    data: {
      cartIds
    }
  }
  )
}
