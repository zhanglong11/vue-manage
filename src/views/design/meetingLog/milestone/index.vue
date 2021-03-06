<!--
 * @Description: 里程碑会议
 * @Author:
 * @Date: 2020-01-17 16:27:45
 -->
<template>
  <div>
    <el-form ref="pageQuery" :model="pageQuery" inline class="search-form">
      <el-row :gutter="4">
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="会议主题" prop="meetingTheme">
            <el-input v-model="pageQuery.meetingTheme" placeholder="会议主题" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-form-item label="会议结论" prop="meetingConclusion">
            <el-select v-model="pageQuery.meetingConclusion" placeholder="请选择">
              <el-option
                v-for="item in conclusions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="12">
          <el-form-item label="起止时间" prop="time">
            <el-date-picker
              v-model="pageQuery.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12">
          <el-button v-access="'meetingLog-milestone-search'" type="primary" icon="el-icon-search" @click="search"
            >查询</el-button
          >
          <el-button v-access="'meetingLog-milestone-search'" icon="el-icon-refresh-right" @click="reset"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <Table
      ref="table"
      v-loading="tableLoading"
      :tableData="tableData"
      :pageQuery="pageQuery"
      :total="total"
      rowId="id"
      :columns="tableColumn"
      @selectionChange="selectionChange"
      @getList="getList"
      @pageChange="pageChange"
      @sizeChange="sizeChange"
    />
  </div>
</template>
<script>
import PageMixin from '@/mixins/pageMixin'
import api from '@/api/design/meeting'
export default {
  name: 'Milestone',
  mixins: [PageMixin],
  props: {
    // 里程碑id
    taskUniqueId: {}
  },
  data() {
    return {
      // 选中的会议id
      meetingId: '',
      time: null,
      tableColumn: [
        {
          prop: 'taskName',
          label: '关联任务'
        },
        {
          prop: 'taskStage',
          label: '任务阶段',
          render: (h, { row }) => {
            if (row.status === 0) {
              return h('div', {}, '未开始')
            } else if (row.status === 1) {
              return h('div', {}, '进行中')
            } else {
              return h('div', {}, '已完成')
            }
          }
        },
        {
          prop: 'creatorName',
          label: '发起人'
        },
        {
          prop: 'meetingTime',
          label: '会议时间',
          width: '170px'
        },
        {
          prop: 'principalName',
          label: '负责人'
        },
        {
          prop: 'status',
          label: '会议状态',
          render: (h, { row }) => {
            if (row.status === 1) {
              return h('div', {}, '未开始')
            } else if (row.status === 2) {
              return h('div', {}, '进行中')
            } else if (row.status === 3) {
              return h('div', {}, '已结束')
            } else {
              return h('div', {}, '-')
            }
          }
        },
        {
          prop: 'meetingConclusion',
          label: '会议结论',
          render: (h, { row }) => {
            if (row.meetingConclusion === 1) {
              return h('div', {}, '通过')
            } else if (row.meetingConclusion === 2) {
              return h('div', {}, '不通过')
            } else {
              return h('div', {}, '-')
            }
          }
        },
        {
          prop: 'handle',
          label: '操作',
          width: '300',
          render: (h, { row }) => {
            let conclusion = h(
              'el-button',
              {
                props: {
                  type: 'text'
                },
                directives: [
                  {
                    name: 'access',
                    value: 'meetingLog-milestone-conclusion'
                  }
                ],
                on: {
                  click: e => {
                    e.stopPropagation()
                    this.$emit('showConclusion', 2, row.id)
                  }
                }
              },
              '会议结论'
            )
            let modification = h(
              'el-button',
              {
                props: {
                  type: 'text'
                },
                directives: [
                  {
                    name: 'access',
                    value: 'meetingLog-milestone-modification'
                  }
                ],
                on: {
                  click: e => {
                    e.stopPropagation()
                    this.$emit('showModification', 2, row.id)
                  }
                }
              },
              '修改通知'
            )
            let details = h(
              'el-button',
              {
                props: {
                  type: 'text'
                },
                directives: [
                  {
                    name: 'access',
                    value: 'meetingLog-milestone-details'
                  }
                ],
                on: {
                  click: e => {
                    e.stopPropagation()
                    this.$emit('showDetais', 2, row.id)
                  }
                }
              },
              '会议详情'
            )
            // 1：未开始
            // 2：进行中
            // 3：已结束
            // 会议未开始+会议已结束不可填写会议结论
            // 如果有结论+会议状态已结束不可修改通知
            return h('div', [
              row.status !== 2 ? null : conclusion,
              row.meetingConclusion || row.status === 3 ? null : modification,
              details
            ])
          }
        }
      ],
      request: api.getMeetingList,
      pageQuery: {
        projectId: localStorage.getItem('projectId'),
        taskId: this.taskUniqueId,
        time: null
      },
      requestFlag: false,
      conclusions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '通过',
          value: 1
        },
        {
          label: '不通过',
          value: 2
        }
      ]
    }
  },
  watch: {
    taskUniqueId(val) {
      this.pageQuery.taskId = val
      this.getList()
    },
    'pageQuery.time'(val) {
      if (val.length === 1 && val[0] === null) {
        this.pageQuery.meetingBeginTime = ''
        this.pageQuery.meetingEndTime = ''
      } else {
        this.pageQuery.meetingBeginTime = moment(val[0]).format('YYYY-MM-DD HH:MM:SS')
        this.pageQuery.meetingEndTime = moment(val[1]).format('YYYY-MM-DD HH:MM:SS')
      }
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.search-form {
  padding-top: 20px;
}
</style>
