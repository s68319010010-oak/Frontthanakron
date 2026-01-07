<template>
  <div
    class="p-6 max-w-3xl mx-auto"
    style="font-family: 'Prompt', sans-serif;"
  >
    <!-- ===== Profile Header ===== -->
    <div class="flex items-center space-x-4 mb-6">
      <img
        :src="getAvatar(user.avatar)"
        alt="Avatar"
        class="w-20 h-20 rounded-full object-cover border"
      />

      <div>
        <h1 class="text-2xl font-bold">{{ user.name }}</h1>
        <p class="text-gray-500 capitalize">{{ user.role }}</p>
      </div>
    </div>

    <!-- ===== Add Task ===== -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="เพิ่มงานใหม่"
        class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      <button
        @click="addTask"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        เพิ่ม
      </button>
    </div>

    <!-- ===== Task List ===== -->
    <div>
      <h2 class="text-xl font-semibold mb-3">รายการงาน</h2>

      <ul v-if="tasks.length" class="space-y-2">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center justify-between border rounded px-3 py-2"
        >
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="task.completed"
              @change="updateTaskStatus(task)"
            />

            <span
              :class="{
                'line-through text-gray-400': task.completed
              }"
            >
              {{ task.title }}
            </span>
          </div>

          <button
            @click="deleteTask(task.id)"
            class="text-red-500 hover:text-red-700"
          >
            ลบ
          </button>
        </li>
      </ul>

      <p v-else class="text-gray-400">ยังไม่มีงาน</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskProfile",

  data() {
    return {
      user: {
        name: "ธนากร สอนพิมพ์ดี",
        role: "นักศึกษา",
        avatar: "bussiness-man.png",
      },

      newTaskTitle: "",

      tasks: [
        { id: 1, title: "ทำรายงานประจำเดือน", completed: false },
        { id: 2, title: "เตรียมงานนำเสนอ", completed: true },
        { id: 3, title: "ส่งแบบฟอร์มประเมิน", completed: false },
      ],
    };
  },

  methods: {
    getAvatar(filename) {
      if (!filename) return "";
      return `/uploads/${filename}`; // ไฟล์ต้องอยู่ public/uploads/
    },

    addTask() {
      if (this.newTaskTitle.trim() === "") return;

      this.tasks.push({
        id: Date.now(),
        title: this.newTaskTitle,
        completed: false,
      });

      this.newTaskTitle = "";
    },

    updateTaskStatus(task) {
      console.log("Task updated:", task);
      // ตรงนี้ต่อ backend ได้
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    },
  },
};
</script>
