<template>
  <div class="contentWrapper">
    <div class="headContainer">
      <div class="formWrapper">
        <el-form ref="form" :inline="true" :model="filter">
          <el-form-item label="" label-width="0" prop="keyword" style="margin-right: 20px;">
            <el-input v-model="filter.keyword" placeholder="合同名称/合同编号/甲方/乙方/创建人" style="width: 300px;">
              <i slot="suffix" class="el-icon-search"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="合同类型" label-width="120px" prop="type" style="margin-right: 20px;">
            <ContractTypeSelectSmartDecoration v-model="filter.type"></ContractTypeSelectSmartDecoration>
          </el-form-item>
          <el-form-item label="招采方式" label-width="120px" prop="purchaseMode" style="margin-right: 20px;">
            <el-select v-model="filter.purchaseMode">
              <el-option value="null" label="全部"> </el-option>
              <el-option value="1" label="招标"> </el-option>
              <el-option value="2" label="非招标"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同状态" label-width="120px" prop="status">
            <ContractStatusSelect v-model="filter.status"></ContractStatusSelect>
          </el-form-item>
          <el-form-item label="创建日期" prop="date">
            <el-date-picker
              v-model="filter.date"
              type="daterange"
              range-separator="至"
              start-placeholder="请选择"
              end-placeholder="请选择"
              style="width: 400px;"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" icon="el-icon-search" @click="refresh(true)">搜索</el-button>
              <el-button icon="el-icon-refresh-left" @click="resetFilter()">重置</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <el-button
          v-if="$hasPower('ContractAddSmartDecoration')"
          type="primary"
          icon="el-icon-plus"
          @click="modalStatus = true"
          >新建合同</el-button
        ></el-col
      >
      <el-col :span="6" style="text-align: right;"> <a @click="handleDownload"></a></el-col>
    </el-row>
    <div class="tableWrapper">
      <vxe-table
        ref="xTable"
        v-loading="loading"
        border
        :show-header-overflow="true"
        column-min-width="140px"
        :data="tableData"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
      >
        <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
        <vxe-table-column field="code" title="合同编号" />
        <vxe-table-column field="name" title="合同名称">
          <template slot-scope="{ row }">
            <span v-if="$hasPower('ContractDetailSmartDecoration')" style="margin: 0 3px;">
              <a @click="handleDetail(row.id)">{{ row.name }}</a></span
            >
            <span v-else>{{ row.name }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="type" title="合同类型">
          <template slot-scope="{ row }">
            <span>{{ $getLabel(contractType, row.type) }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="firstParty" title="甲方" />
        <vxe-table-column field="secondParty" title="乙方" />
        <vxe-table-column field="amount" title="合同金额（万元）" width="150" formatter="toWan" />
        <vxe-table-column field="purchaseMode" title="招采方式"
          ><template slot-scope="{ row }">
            <span>{{ row.purchaseMode == 1 ? '招标' : '非招标' }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="status" title="合同状态">
          <template slot-scope="{ row }">
            <span>{{ $getLabel(contractStatus, row.status) }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="signDate" title="签订日期" width="100">
          <template slot-scope="{ row }">
            <span>{{ moment(row.signDate).format('YYYY-MM-DD') }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="creatorName" title="创建人" />
        <vxe-table-column field="createTime" title="创建时间" width="150" />
        <vxe-table-column title="操作" width="150">
          <template slot-scope="{ row }">
            <span v-if="$hasPower('ContractDetailSmartDecoration')" style="margin: 0 3px;">
              <a @click="handleDetail(row.id)">查看</a></span
            >
            <template v-if="row.status === 0">
              <span v-if="$hasPower('ContractEditSmartDecoration')" style="margin: 0 3px;"
                ><a @click="handleEdit(row)">编辑</a></span
              >
              <span v-if="$hasPower('ContractDetailSmartDecorationDelete')" style="margin: 0 3px;"
                ><a @click="handleDelete(row.id)">删除</a></span
              >
            </template>
            <template v-if="row.status === 2">
              <!--<span style="margin: 0 3px"><a @click="handleEdit(row)">编辑</a></span>-->
            </template>
          </template>
        </vxe-table-column>
      </vxe-table>
      <div style="margin-top: 10px;">
        <div class="toolbar" style="display: flex; justify-content: space-between;">
          <div class="num">
            共 {{ total }} 条记录 第 {{ currentPage }} / {{ Math.ceil(total / pageSize) || 1 }} 页
            <el-button type="text primary" class="el-icon-refresh" @click="refresh(false)"></el-button>
          </div>
          <el-pagination
            class="pagination"
            :total="total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="sizes, prev, pager, next, jumper"
            @current-change="handlePageChange"
            @size-change="handlePageSizeChange"
          />
        </div>
      </div>
    </div>
    <ContractForm
      v-if="contractFormVisible"
      :visible="contractFormVisible"
      @close="contractFormVisible = false"
    ></ContractForm>
    <!-- 选择合同类型(甲方/乙方)组件 start -->
    <SelectContractPartyType v-model="modalStatus" @change="addContract" />
    <!-- 选择合同类型(甲方/乙方)组件 end -->
  </div>
</template>
<script>
import contractType from '@/lib/contractTypeSmartDecoration'
import contractStatus from '@/lib/contractStatus'
import ContractForm from './ContractAdd'
import SelectContractPartyType from '@/components/selectContractPartyType' // 选择合同类型(甲方/乙方)组件
import Api from '../api/contractManage'
export default {
  name: 'ContractManage',
  components: { ContractForm, SelectContractPartyType },
  data() {
    return {
      projectId: localStorage.getItem('projectId'),
      loading: false,
      filter: {
        keyword: '',
        type: null,
        status: null,
        purchaseMode: null,
        date: []
      },
      contractFormVisible: false,
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      contractType: contractType,
      contractStatus: contractStatus,
      modalStatus: false // 新建合同模态框
    }
  },
  computed: {
    // 当前企业id
    companyId() {
      return this.$store.state.user.companyId
    }
  },
  created() {
    this.refresh(true)
  },
  methods: {
    refresh(isFirstPage) {
      if (isFirstPage) {
        this.currentPage = 1
      }
      this.loading = true
      Api.getContractList({
        ...this.filter,
        rows: this.pageSize,
        page: this.currentPage,
        projectId: this.projectId,
        startDate: this.filter.date[0],
        endDate: this.filter.date[1]
      })
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.records
            this.total = res.data.total
          } else {
            this.$message.error('未知错误,请重试')
          }
        })
        .finally(() => (this.loading = false))
    },
    /**
   任务名称：2732/合同管理查看详情修改
   开发人员：崔洛宜
   日期：2020-03-26
   任务类型：修改逻辑
   **/
    handleDetail(id) {
      this.$router.push({ name: `ContractDetailSmartDecoration`, params: { id: id, isCheck: false } })
    },
    // 编辑
    handleEdit(item) {
      let partyType = item.firstPartyId === this.companyId ? 1 : 2
      this.$router.push({ name: `ContractEditSmartDecoration`, query: { id: item.id, isEdit: true, partyType } })
    },
    handleDelete(id) {
      Api.deleteContractById(id).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.refresh()
        } else {
          this.$message.error('未知错误,请重试')
        }
      })
    },
    handleDownload() {
      console.log('下载')
    },
    handlePageChange(page) {
      this.currentPage = page
      this.refresh()
    },
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.refresh()
    },
    // 新建合同
    addContract(partyType) {
      this.modalStatus = false
      this.$router.push({
        name: 'ContractAddSmartDecoration',
        query: {
          partyType
        }
      })
    },
    /**
     任务名称：BUG1245/合同管理-【下载合同范本】点击没反应，【重置】-列表的数据没有被重置
     开发人员：崔洛宜
     日期：2020-03-23
     BUG类型：测试人员发现的研发自测未通过引起的BUG
     **/
    resetFilter() {
      this.$refs.form.resetFields()
      this.refresh(true)
    }
  }
}
</script>
<style lang="less" scoped>
.contentWrapper {
  padding: 10px;
}
.tableWrapper {
  margin-top: 20px;
}
.headContainer {
  display: flex;
  justify-content: space-between;
  .formWrapper {
    flex: 1;
  }
  .operateButton {
    flex: 0 0 200px;
    text-align: right;
  }
}
</style>
