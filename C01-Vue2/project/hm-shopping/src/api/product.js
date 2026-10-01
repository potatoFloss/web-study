import request from '@/utils/request'

// 搜索商品
export function getProList (paramsObj) {
  const { categoryId, goodsName, page } = paramsObj
  return request({
    url: '/goods/list',
    params: {
      sortType: 'all', // all-按综合搜索(默认)，sales-按销量搜索，price-按价格搜索
      sortPrice: '0', // 0-价格从低到高， 1-价格从高到低
      categoryId, // 商品分类id
      goodsName, // 商品名称
      page // 页码
    }
  })
}

// 获取商品详情
export const getProDetail = (goodsId) => {
  return request({
    url: '/goods/detail',
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    params: {
      goodsId, // 商品id
      limit // 获取评论数量
    }
  })
}
