<!--
 * @Description: 消息管理
 * @Author:
 * @Date: 
 -->
<template>
  <div>
    <div class="title">消息管理</div>
    <el-form ref="pageQuery" :model="pageQuery" label-width="100px">
      <el-row :gutter="3">
        <!-- <el-col :span="6">
          <el-form-item label="标题" prop="title">
            <el-input v-model="pageQuery.title"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="6">
          <el-form-item label="消息类型" prop="type">
            <el-select v-model="pageQuery.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="reset">重置</el-button>
          </el-form-item>
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
    <!-- 一般消息详情 -->
    <el-dialog :visible.sync="detailsVisible" width="60%" title="消息详情">
      <div class="content">
        <el-form ref="form" :model="messageForm" label-width="80px">
          <el-form-item label="时间：">{{ messageForm.time }}</el-form-item>
          <el-form-item label="标题：">{{ messageForm.title }}</el-form-item>
          <el-form-item label="类型：">{{ typeFilter(messageForm.type) }}</el-form-item>
          <el-form-item label="内容：">{{ messageForm.content }}</el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 会议详情 -->
    <Details ref="meetingDetails" :type="meetingType" :meetingId="meetingId" />
  </div>
</template>

<script>
import PageMixin from '@/mixins/pageMixin'
import Details from '../design/meetingLog/components/details'
import api from '@/api/message/index'
export default {
  name: 'Message',
  components: {
    Details
  },
  mixins: [PageMixin],
  data() {
    return {
      meetingId: '',
      meetingType: null,
      options: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 1,
          label: '系统'
        },
        {
          value: 2,
          label: '会议'
        },
        {
          value: 3,
          label: '审批'
        },
        {
          value: 4,
          label: '任务'
        }
      ],
      messageForm: {
        time: '123124'
      },
      detailsVisible: false,
      pageQuery: {
        projectId: localStorage.getItem('projectId')
      },
      tableColumn: [
        { prop: 'createTime', label: '时间' },
        { prop: 'title', label: '标题' },
        {
          prop: 'type',
          label: '消息类型',
          render: (h, { row }) => {
            let obj = this.options.find(item => item.value === row.type)
            if (obj && obj.label) {
              return h('div', {}, obj.label)
            }
          }
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return h('div', [
              h(
                'el-button',
                {
                  props: {
                    type: 'text'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation()
                      if (row.type !== 2) {
                        //一般详情
                        this.getDeatails(row.id)
                      } else {
                        //会议详情:这里两个参数：会议id+会议
                        if (row.field) {
                          let obj = JSON.parse(row.field)
                          this.getMeetingDeatails(obj.meetingId, obj.type)
                        }
                      }
                    }
                  }
                },
                '查看详情'
              ),
              h(
                'el-button',
                {
                  props: {
                    type: 'text'
                  },
                  on: {
                    click: e => {
                      e.stopPropagation()
                      this.del(row.id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      request: api.getList
    }
  },
  methods: {
    typeFilter(val) {
      let res = this.options.find(item => item.value === val)
      return res ? res.label : ''
    },
    async getDeatails(id) {
      this.detailsVisible = true
      let res = await api.getDetails(id)
      console.log(res)
    },
    getMeetingDeatails(id, type) {
      this.meetingType = type
      this.meetingId = id
      this.$refs.meetingDetails.show()
    },
    async del(id) {
      let res = await api.deleteById(id)
      this.$message.success('删除成功')
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 800;
  padding-bottom: 10px;
}
</style>
