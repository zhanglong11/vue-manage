<!--
@任务名称：【补：3月1日~3月18日的代码提交注释】
@开发人员: 董渊海
@git提交编号: e802eae5b950287398c0f6e296e66da98e86472e
@代码提交修改日期: 2020-03-02
@任务类型: 修改代码，完成 需用计划 审核列表接口对接，审核和详情接口对接，审核和详情页样式重新调整
@补加代码注释日期: 2020-04-11

@任务名称：【补：3月1日~3月18日的代码提交注释】
@开发人员: 董渊海
@git提交编号: 205b52064519eb0958411cba677f55987291c7c8
@代码提交修改日期: 2020-03-05
@任务类型: 修改代码，物资设备计划模块和审核模块 时间组件 添加时分秒
@补加代码注释日期: 2020-04-11
-->
<template>
  <div>
    <el-form ref="form" :inline="true" :model="form">
      <ul class="search_bar">
        <li>
          <el-form-item label="" prop="synthesize">
            <el-input
              v-model="form.synthesize"
              placeholder="需用计划编号/需用计划名称/创建人"
              style="width: 250px;"
              suffix-icon="el-icon-search"
            />
          </el-form-item>
          <el-form-item label="计量周期" prop="cycleTime">
            <el-date-picker
              v-model="form.cycleTime"
              placeholder="请选择"
              type="month"
              style="width: 112px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-date-picker
              v-model="form.createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="请选择"
              end-placeholder="请选择"
              :default-time="['00:00:00', '23:59:59']"
              style="width: 336px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 120px;">
              <el-option label="待审核" value="1"></el-option>
              <el-option label="已通过" value="2"></el-option>
              <el-option label="已驳回" value="3"></el-option>
            </el-select>
          </el-form-item>
        </li>
        <li class="search_bar_btn">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </li>
      </ul>
    </el-form>

    <vxe-table border resizable show-overflow :data="tableData" :loading="loading">
      <vxe-table-column type="seq" title="序号" width="50"></vxe-table-column>
      <vxe-table-column field="planCode" title="需用计划编号"></vxe-table-column>
      <vxe-table-column field="name" title="需用计划名称"></vxe-table-column>
      <vxe-table-column field="calculatePeriod" title="计量周期"></vxe-table-column>
      <vxe-table-column field="remark" title="备注"></vxe-table-column>
      <vxe-table-column field="creatorName" title="创建人"></vxe-table-column>
      <vxe-table-column field="createTime" title="创建时间"></vxe-table-column>
      <vxe-table-column field="status" title="状态">
        <template v-slot="{ row }">
          <span v-if="row.status === 0">草稿</span>
          <span v-else-if="row.status === 1">待审核</span>
          <span v-else-if="row.status === 2">已通过</span>
          <span v-else-if="row.status === 3">已驳回</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="130">
        <template v-slot="{ row }">
          <span v-if="row.status === 1">
            <a @click="handleAudit(row.id, row)">审核</a>
          </span>
          <span v-else>
            <a @click="handleDetail(row.id, row)">查看</a>
          </span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <vxe-pager
      border
      size="medium"
      :loading="loading"
      :current-page="page"
      :page-size="rows"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    >
    </vxe-pager>
  </div>
</template>

<script>
import Api from '@/api/device/goodsPlan/needPlan'
export default {
  name: 'NeedPlanAudit',
  data() {
    return {
      form: {
        synthesize: '',
        cycleTime: '',
        createTime: '',
        status: ''
      },
      tableData: [],

      loading: false,
      page: 1,
      rows: 10,
      total: 0
    }
  },
  mounted() {
    this.refresh(1, this.rows)
  },
  methods: {
    refresh(page, rows) {
      let createTimeBegin = ''
      let createTimeEnd = ''
      if (this.form.createTime !== null && this.form.createTime !== '' && this.form.createTime.length !== 1) {
        createTimeBegin = moment(this.form.createTime[0]).format('YYYY-MM-DD HH:mm:ss')
        createTimeEnd = moment(this.form.createTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      let calculatePeriod = ''
      if (this.form.cycleTime !== null && this.form.cycleTime !== '') {
        calculatePeriod = moment(this.form.cycleTime).format('YYYY-MM')
      }
      let content = this.form.synthesize
      let status = this.form.status

      this.loading = true

      Api.getNeedPlanList({
        type: '1', //查询需用计划
        auditFlag: '1', //非草稿状态
        projectId: localStorage.getItem('projectId'),
        content,
        calculatePeriod,
        createTimeBegin,
        createTimeEnd,
        status,
        page,
        rows
      }).then(res => {
        //console.log(res)
        this.loading = false
        this.tableData = res.data.records
        this.total = res.data.total
        this.page = page
        this.rows = rows
      })
    },
    handleSearch() {
      this.refresh(1, this.rows)
    },
    resetForm() {
      this.$refs['form'].resetFields()
      this.refresh(1, this.rows)
    },
    handleDetail(id, row) {
      this.$router.push({ name: 'AuditNeedPlanDetail', params: { id: id } })
    },
    handleAudit(id, row) {
      this.$router.push({ name: 'AuditNeedPlan', params: { id: id } })
    },
    handleEdit(id, row) {},
    handleDelete(id, row) {},

    handlePageChange({ currentPage, pageSize }) {
      this.refresh(currentPage, pageSize)
    }
  }
}
</script>

<style scoped lang="less">
.search_bar {
  display: flex;
  justify-content: space-between;

  .search_bar_btn {
    white-space: nowrap;
  }
}
</style>
