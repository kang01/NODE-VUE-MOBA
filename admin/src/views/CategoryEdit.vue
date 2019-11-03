<template>
  <div class>
    <h2>{{id ? "编辑": "新建"}}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in this.parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      // 父级的选项
      parents:[]
    };
  },
  methods: {
    async save() {
      console.log(this.model);
      let res 
      if(this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }

      this.$message({
        type: "success",
        message: "保存成功"
      });

      // 跳转分类列表
      this.$router.push("/categories/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents =  res.data
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetch()
  }
};
</script>

<style  scoped>
</style>