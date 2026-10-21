import request from '@/utils/request'

// 分类：文章分类列表
export const artGetChannelsService = () => {
  return request({
    url: '/my/cate/list'
  })
}

// 分类：添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 分类：编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 分类：删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

// 文章：获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })
