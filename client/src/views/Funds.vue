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
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="“选择结束时间”"
          >
          </el-date-picker>

          <!-- elementUI date-picker报错
          https://blog.csdn.net/qq_21473443/article/details/125333154?spm=1001.2014.3001.5502
           -->
          <el-button
            class="select"
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
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
            prop="type"
            label="收支类型"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="describe"
            label="描述"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="income" label="收入" align="center" width="60">
          </el-table-column>
          <el-table-column prop="expand" label="支出" width="90" align="center">
          </el-table-column>
          <!-- data switch status -->
          <el-table-column
            prop="cash"
            label="账户现金"
            width="90"
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
            <template slot-scope="scope">
              <!--                @click="handleEdit(scope.$index, scope.row)" -->
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)"
                ><i class="el-icon-edit"></i
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row._id)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- AddFund dialog section -->

      <el-dialog title="添加资金信息" :visible.sync="dialogAddVisible">
        <el-form
          :model="addFund_form"
          :rules="addFund_rules"
          ref="addFundFormRef"
        >
          <!-- type -->
          <el-form-item
            label="收支类型"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-input v-model="addFund_form.type" autocomplete="off"></el-input>
          </el-form-item>

          <!-- describe -->

          <el-form-item
            label="收支描述"
            :label-width="formLabelWidth"
            prop="describ"
          >
            <el-input
              v-model="addFund_form.describ"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <!-- income -->

          <el-form-item
            label="收入"
            :label-width="formLabelWidth"
            prop="income"
          >
            <el-input
              v-model="addFund_form.income"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <!-- expend -->

          <el-form-item
            label="支出"
            :label-width="formLabelWidth"
            prop="expand"
          >
            <el-input
              v-model="addFund_form.expand"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="账户现金"
            :label-width="formLabelWidth"
            prop="cash"
          >
            <el-input v-model="addFund_form.cash" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="addFund_form.remark"
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

      <!-- EditFund dialog section -->
      <el-dialog title="修改资金信息" :visible.sync="dialogEditVisible">
        <el-form
          :model="editFund_form"
          :rules="addFund_rules"
          ref="editFundFormRef"
        >
          <!-- username -->
          <el-form-item
            label="资金类型"
            :label-width="formLabelWidth"
            prop="type"
          >
            <el-input
              v-model="editFund_form.type"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>

          <!-- email -->
          <el-form-item
            label="收支描述"
            :label-width="formLabelWidth"
            prop="describe"
          >
            <el-input
              v-model="editFund_form.describe"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- mobile -->
          <el-form-item
            label="收入"
            :label-width="formLabelWidth"
            prop="income"
          >
            <el-input
              v-model="editFund_form.income"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="支出"
            :label-width="formLabelWidth"
            prop="expand"
          >
            <el-input
              v-model="editFund_form.expand"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="账户现金"
            :label-width="formLabelWidth"
            prop="cash"
          >
            <el-input
              v-model="editFund_form.cash"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="备注"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="editFund_form.remark"
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
import axios from "../utils/interceptor";
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
      addFund_form: {
        type: "",
        describ: "",
        income: "",
        expand: "",
        cash: "",
        remark: "",
      },

      editFund_form: {
        _id: "",
        type: "",
        describe: "",
        income: "",
        expand: "",
        cash: "",
        remark: "",
      },
      addFund_rules: {
        type: [
          // rules not filled the content
          { required: true, message: "type必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 20,
            message: "type长度要在3到20个字符",
            trigger: "blur",
          },
        ],
        describe: [
          // rules not filled the content
          { required: true, message: "收支描述必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 20,
            message: "收支描述长度要在3到20个字符",
            trigger: "blur",
          },
        ],
        income: [
          // rules not filled the content
          { required: true, message: "收入必填", trigger: "blur" },
          // rule filled the content
        ],
        expand: [
          // rules not filled the content
          { required: true, message: "支出必填", trigger: "blur" },
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
      await axios.get("/api/profile").then((res) => {
        // console.log(res.data);
        this.allProfileList = res.data;
        this.filterTableData = res.data;
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
    async addSubmit() {
      this.$refs.addFundFormRef.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        // console.log(this.addFund_form);
        // vue的$axios请求设置为form表单类型/api/api/p
        // https://blog.csdn.net/s18813688772/article/details/111715754
        await axios
          .post("/api/profile", this.addFund_form, {
            headers: { "content-type": "application/json" },
          })
          .then((res) => {
            this.allProfileList = res.data;
            this.$message({
              message: "创建成功",
              type: "success",
            });
            this.dialogAddVisible = false;
            this.loadData();
          })
          .catch((err) => {
            this.$message.error("创建失败");
            console.log(err);
          });
      });
    },
    editSubmit() {
      this.$refs.editFundFormRef.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        // console.log(this.addFund_form);
        // vue的$axios请求设置为form表单类型
        // https://blog.csdn.net/s18813688772/article/details/111715754
        await axios
          .put(
            `/api/profile/${this.editFund_form._id}`,
            this.editFund_form,
            {
              headers: { "content-type": "application/json" },
            }
          )
          .then((res) => {
            this.allProfileList = res.data;
            this.$message({
              message: "更新成功",
              type: "success",
            });
            this.dialogEditVisible = false;
            this.loadData();
          })
          .catch((err) => {
            this.$message.error("更新失败");
            console.log(err);
          });
      });
      console.log("editUserSubmit");
    },
    handleEdit(row) {
      this.dialogEditVisible = true;
      this.editFund_form = row;
      console.log(this.editFund_form);
    },
    async handleDelete(id) {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning", // text color in the middle
      })
        .then(async () => {
          await axios.delete(`/api/profile/${id}`).then((res) => {
            //  console.log(res.data.meta)
            if (res.data.success != true) {
              this.$message.error("删除失败");
            }
            // When you finish the delete, then
            //1.Reset the search field
            // 2.load the data again(query info is zero)

            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.loadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(id);
    },
    async handleSearch() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择区间",
        });
        this.loadData();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      this.allProfileList = this.filterTableData.filter((item) => {
        // console.log(item)
        const date = new Date(item.date);
        const time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      this.profileList = this.allProfileList.filter((item, index) => {
        return index < this.pagesize;
      });
      // console.log(this.allProfileList);
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