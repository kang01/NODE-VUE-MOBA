module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')
  // 新增分类
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除分类 
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 分类列表
  router.get('/', async(req, res) => {
    const items = await req.Model.find().populate('parent').limit(10)
    res.send(items)
  })
  // 根据Id获取分类记录
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    // 中间件
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  } , router) 
}