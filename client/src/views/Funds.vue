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
          <el-button class="select" type="primary" size="small" icon="search"
            >筛选</el-button
          >
          <el-button
            class="add_button"
            type="primary"
            size="small"
            @click="dialogAddVisible = true"
            >添加</el-button
          >
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" size="small" icon="search">筛选</el-button>
        </el-form-item> -->
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
            <!--                @click="handleEdit(scope.$index, scope.row)" -->
            <el-button size="mini" type="primary" @click="handleEdit"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- AddUser dialog section -->
      <el-dialog title="添加资金信息" :visible.sync="dialogAddVisible">
        <el-form
          :model="addUser_form"
          :rules="addUser_rules"
          ref="addUserFormRef"
        >
          <!-- username -->
          <el-form-item
            label="收支类型"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input
              v-model="addUser_form.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <!-- password -->
          <el-form-item
            label="收支描述"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              v-model="addUser_form.password"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- email -->
          <el-form-item label="收入" :label-width="formLabelWidth" prop="email">
            <el-input
              v-model="addUser_form.email"
              type="email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- mobile -->
          <el-form-item
            label="支出"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="addUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="账户现金"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="addUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="addUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>

        <!-- footer -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <!-- EditUser dialog section -->
      <el-dialog title="修改资金信息" :visible.sync="dialogEditVisible">
        <el-form
          :model="editUser_form"
          :rules="addUser_rules"
          ref="editUserFormRef"
        >
          <!-- username -->
          <el-form-item
            label="资金类型"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input
              v-model="editUser_form.username"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>

          <!-- email -->
          <el-form-item
            label="收支描述"
            :label-width="formLabelWidth"
            prop="email"
          >
            <el-input
              v-model="editUser_form.email"
              type="email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- mobile -->
          <el-form-item
            label="收入"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="editUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="支出"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="editUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="账户现金"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="editUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input
              v-model="editUser_form.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>

        <!-- footer -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->

      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
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
      formLabelWidth: "130px",
      profileList: [],
      value: true,
      currentPage4: 4,
      total: 0,
      pagesize: 2,
      dialogAddVisible: false,
      dialogEditVisible: false,
      search_data: {
        startTime: "",
        endTime: "",
      },
      allProfileList: [], //存储从后端获取到的全部数据
      filterTableData: [], //经过时间筛选后得到的数据
      addUser_form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_name: "",
      },

      editUser_form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_name: "",
      },
      addUser_rules: {
        username: [
          // rules not filled the content
          { required: true, message: "用户名必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户名长度要在3到6个字符",
            trigger: "blur",
          },
        ],
        password: [
          // rules not filled the content
          { required: true, message: "用户密码必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户密码长度要在3到6个字符",
            trigger: "blur",
          },
        ],
        email: [
          // rules not filled the content
          { required: true, message: "邮箱必填", trigger: "blur" },
          // rule filled the content
        ],
        mobile: [
          // rules not filled the content
          { required: true, message: "手机号必填", trigger: "blur" },
          // rule filled the content
        ],
      },
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
        // console.log(res.data);
        this.allProfileList = res.data;
        this.total = res.data.length;
        this.profileList = this.allProfileList.filter((item, index) => {
          return index < this.pagesize;
        });
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.profileList = this.allProfileList.filter((item, index) => {
        return index < this.pagesize;
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);

      let index = this.pagesize * (val - 1);
      let total = this.pagesize * val;
      // for loop use the arry.push to render the data
      let tables = [];
      for (let i = index; i < total; i++) {
        if (this.allProfileList[i]) {
          tables.push(this.allProfileList[i]);
        }
        this.profileList = tables;
      }
    },
    addSubmit() {
      console.log("addUserSubmit");
    },
    editSubmit() {
      console.log("editUserSubmit");
    },
    handleEdit() {
      (this.dialogEditVisible = true), console.log("edit");
    },
    handleDelete() {
      console.log("delete");
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
.select {
  margin-left: 5px;
}
.add_button {
  float: right;
}
</style>