<template>
  <div
    class="min-h-screen bg-gray-100 flex justify-center pt-16"
    style="font-family: 'Prompt', sans-serif"
  >
    <div class="w-full max-w-md">
      <!-- Title -->
      <h2 class="text-center text-xl font-bold mb-6">
        แบบฟอร์มประเมินครู
      </h2>

      <!-- Card -->
      <div v-if="teacher" class="bg-white rounded-lg shadow p-6">
        <!-- Teacher Info -->
        <div class="mb-4">
          <p class="font-semibold">{{ teacher.name }}</p>
          <p class="text-sm text-gray-600">{{ teacher.department }}</p>
          <span
            class="inline-block mt-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded"
          >
            {{ teacher.period }}
          </span>
        </div>

        <hr class="my-4" />

        <!-- Q1 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            1. ความรับผิดชอบ
          </label>
          <select
            v-model="form.q1"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="">เลือกคะแนน</option>
            <option v-for="n in 5" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </div>

        <!-- Q2 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">
            2. การสอน
          </label>
          <select
            v-model="form.q2"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="">เลือกคะแนน</option>
            <option v-for="n in 5" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </div>

        <!-- Comment -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">
            ความคิดเห็นเพิ่มเติม
          </label>
          <textarea
            v-model="form.comment"
            rows="3"
            class="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          @click="submitForm"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          ส่งแบบประเมิน
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluationForm",
  props: ["id"],

  data() {
    return {
      teacher: null,
      form: {
        q1: "",
        q2: "",
        comment: ""
      }
    }
  },

  async created() {
    const res = await fetch(`https://dummyjson.com/users/${this.id}`)
    const u = await res.json()

    this.teacher = {
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      department: u.company?.department || "ไม่ระบุ",
      period: "ปีการศึกษา 2568"
    }
  },

  methods: {
    submitForm() {
      if (!this.form.q1 || !this.form.q2) {
        alert("กรุณาเลือกคะแนนให้ครบ")
        return
      }

      const result = {
        teacher: this.teacher,
        score: this.form,
        total: Number(this.form.q1) + Number(this.form.q2),
        date: new Date().toLocaleDateString("th-TH")
      }

      const list = JSON.parse(localStorage.getItem("evaluations")) || []
      list.push(result)
      localStorage.setItem("evaluations", JSON.stringify(list))

      alert("ส่งแบบประเมินเรียบร้อย")
      this.$router.push("/reports")
    }
  }
}
</script>
