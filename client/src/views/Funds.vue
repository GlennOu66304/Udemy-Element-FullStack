<template>
  <div class="funds">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资金管理管理</el-breadcrumb-item>
      <el-breadcrumb-item>交易流水</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <el-form>
        <el-form-item label="按照时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetimerange">
          </el-date-picker>
          --
          <el-date-picker v-model="search_data.endTime" type="datetimerange">
          </el-date-picker>

          <!-- elementUI date-picker报错
          https://blog.csdn.net/qq_21473443/article/details/125333154?spm=1001.2014.3001.5502
           -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search">筛选</el-button>
        </el-form-item>

        <el-button type="primary">添加用户</el-button>
      </el-form>
      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="profileList" border>
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- index column -->
          <el-table-column
            prop="date"
            label="创建时间"
            width="140"
            align="center"
            fixed
          >
          </el-table-column>

          <el-table-column
            prop="describe"
            label="收支类型"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="income" label="收入" align="center">
          </el-table-column>
          <el-table-column
            prop="expand"
            label="支出"
            width="120"
            align="center"
          >
          </el-table-column>
          <!-- data switch status -->
          <el-table-column
            prop="cash"
            label="账户现金"
            width="120"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注"
            width="140"
            align="center"
          >
          </el-table-column>

          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
          >
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>

            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-setting"></i
            ></el-button>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->

      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Funds",
  components: {},

  data() {
    return {
     

      profileList: [],
      value: true,
      currentPage4: 4,
      total: "",
      pagenum: "",
      search_data: {
        startTime: "",
        endTime: "",
      },
      allTableDate: [], //存储从后端获取到的全部数据
      filterTableData: [], //经过时间筛选后得到的数据
    };
  },

  created() {
    // load the table data first
    this.loadData();
  },

  methods: {
    // Load the data

    async loadData() {
      await this.$axios.get("http://localhost:8800/api/profile").then((res) => {
        console.log(res.data);
        this.profileList = res.data;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-row {
  margin-bottom: 20px;
}
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 200px;
}
</style>